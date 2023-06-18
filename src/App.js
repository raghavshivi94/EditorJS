import "./App.css";
import { useState } from "react";
import MyEditor from "./Components/Editor";
import Button from "@mui/material/Button";
import { Grid, Box, Tabs, Tab } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <div className="App">
      <header className="App-header" spacing={2}>
        <Button variant="contained" sx={{ m: 2 }}>
          Export
        </Button>
        <Button variant="contained" sx={{ m: 2 }}>
          Share
        </Button>
      </header>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <MyEditor />
        </Grid>
        <Grid item xs={4} className="right-sec">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Projects" />
              <Tab label="Insert" />
            </Tabs>
          </Box>
          {activeTab === 0 && (
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <TreeItem nodeId="1" label="Layout">
                <TreeItem nodeId="2" label="Layout 1" />
                <TreeItem nodeId="3" label="Layout 2" />
              </TreeItem>
              <TreeItem nodeId="1" label="Text and Media">
                <TreeItem nodeId="2" label="Text" />
                <TreeItem nodeId="3" label="Media" />
              </TreeItem>
              <TreeItem nodeId="1" label="Tables">
                <TreeItem nodeId="2" label="Table 1" />
                <TreeItem nodeId="3" label="Table 2" />
              </TreeItem>
            </TreeView>
          )}
          {activeTab === 1 && <Box>Insert</Box>}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
