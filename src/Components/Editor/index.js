import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import * as d3 from "d3";
import { select, create, easeLinear, pointer } from "d3";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";

class ChartTool {
  constructor({ data, config, api }) {
    this.data = data;
    this.config = config;
    this.api = api;
    this.element = null;
    this.chart = null;
  }

  static get toolbox() {
    return {
      title: "Chart",
      icon: '<svg width="17" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M48 288h32v160H48zm80-160h32v320h-32zm80-96h32v416h-32zm80 128h32v288h-32zm80-224h32v512h-32zm80 288h32v224h-32zm80-320h32v544h-32zm80 224h32v320h-32zm80-160h32v480h-32zm80 32h32v416h-32zm80-96h32v352h-32z"></path></svg>',
    };
  }

  render() {
    this.element = document.createElement("div");
    this.element.classList.add("chart-tool");
    this.element.innerHTML = `
    <div id="chart-container"></div>
    <div class="tooltip"></div>
  `;

    const chartContainer = this.element.querySelector("#chart-container");
    const tooltip = select(this.element).select(".tooltip");

    const chart = (data, staticColor, x, width, height, yScale, hoverColor) => {
      const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

      const rect = svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", staticColor)
        .attr("x", (d, i) => x(d.country))
        .attr("width", x.bandwidth())
        .attr("y", (d) => yScale(0))
        .attr("height", (d) => height - yScale(0))
        .on("mouseover", function (event, d) {
          tooltip
            .html(
              `<div>Country: ${d.country}</div><div>Value: ${d.value}</div>`
            )
            .style("visibility", "visible");
          d3.select(this).transition().attr("fill", hoverColor);
        })
        .on("mousemove", function (event) {
          const [x, y] = d3.pointer(event);
          tooltip.style("top", `${y - 10}px`).style("left", `${x + 10}px`);
        })
        .on("mouseout", function () {
          tooltip.style("visibility", "hidden");
          d3.select(this).transition().attr("fill", staticColor);
        });

      rect
        .transition()
        .ease(d3.easeLinear)
        .duration(800)
        .attr("y", (d) => yScale(d.value))
        .attr("height", (d) => height - yScale(d.value))
        .delay((d, i) => i * 100);

      return svg.node();
    };

    const data = [
      { country: "Country A", value: 10 },
      { country: "Country B", value: 20 },
      { country: "Country C", value: 15 },
      { country: "Country D", value: 5 },
      { country: "Country E", value: 17 },
      { country: "Country F", value: 12 },
    ];

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, 5])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([8, 0]);

    // Render the chart
    chartContainer.appendChild(
      chart(data, "#088F8F", x, 10, 8, yScale, "#097969", "#454B1B")
    );

    return this.element;
  }

  save() {
    return {
      chart: this.chart, // Return the chart property
    };
  }
}

function MyEditor() {
  const editorInstance = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorInstance.current && editorRef.current) {
      editorInstance.current = new EditorJS({
        holder: editorRef.current,
        autofocus: true,
        placeholder: "Type text or paste a link",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          chart: {
            class: ChartTool,
          },
        },
        onChange: () => {},
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current = null;
      }
    };
  }, []);

  return (
    <div>
      <h1>Report ABC</h1>
      <div ref={editorRef} />
    </div>
  );
}

export default MyEditor;
