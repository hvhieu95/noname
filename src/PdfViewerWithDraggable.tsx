import React, { Component, createRef, RefObject } from "react";
import Draggable from "react-draggable";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import DraggableCard from "./DraggableCard";
import { DocRenderer } from "@cyntler/react-doc-viewer";

type State = {
  fileType: "pdf" | "xlsx";
  viewerHeight: string;
  shapes: Array<"square" | "circle" | "triangle">;
  selectedShapeIndex: number | null;
  
};
type DocViewerProps = {
  documents: Array<{ uri: string }>;
  pluginRenderers: DocRenderer[];
  config: {
    header: {
      disableHeader: boolean;
      disableFileName: boolean;
      retainURLParams: boolean;
    };
  };
  style: { height: string };
};

class ControlledDocViewer extends Component<DocViewerProps, any> {
  shouldComponentUpdate(nextProps: DocViewerProps) {
    // Chỉ tái render khi URI thay đổi
    return nextProps.documents[0].uri !== this.props.documents[0].uri;
  }

  render() {
    return <DocViewer {...this.props} />;
  }
}

class DocumentViewer extends Component<{}, State> {
  private docViewerRef: RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      fileType: "pdf",
      viewerHeight: "1800px",
      shapes: [],
      selectedShapeIndex: null,
    };
    this.docViewerRef = createRef();
  }

  toggleFileType = () => {
    this.setState((prevState) => ({
      fileType: prevState.fileType === "pdf" ? "xlsx" : "pdf",
      shapes: [], // Reset shapes
    }));
  };

  getDocuments = () => {
    if (this.state.fileType === "pdf") {
      return [
        {
          uri: process.env.PUBLIC_URL + "/c4611_sample_explain.pdf",
        },
      ];
    } else if (this.state.fileType === "xlsx") {
      return [
        {
          uri: "https://uploads.codesandbox.io/uploads/user/46ef5051-8a21-46a0-ab94-60d6cd53ab10/jYVg-test-excelaki.xlsx",
        },
      ];
    }
    return [];
  };

  updateViewerHeight = () => {
    if (this.docViewerRef.current) {
      const documentHeight = this.docViewerRef.current.scrollHeight;
      if (this.state.fileType === "pdf") {
        this.setState({
          viewerHeight: `${documentHeight}px`,
        });
      } else if (this.state.fileType === "xlsx") {
        this.setState({
          viewerHeight: "70vh",
        });
      }
    }
  };

  componentDidMount() {
    this.updateViewerHeight();
  }

  addShape = (shape: "square" | "circle" | "triangle") => {
    this.setState((prevState) => ({
      shapes: [...prevState.shapes, shape],
    }));
  };

  removeShape = (indexToRemove: number) => {
    this.setState((prevState) => ({
      shapes: prevState.shapes.filter((_, index) => index !== indexToRemove),
      selectedShapeIndex: null,
    }));
  };

  selectShape = (index: number) => {
    this.setState({ selectedShapeIndex: index });
  };


  render() {
    return (
      <>
        <div className="pdf-viewer-with-draggable">
          <div className="right-panel">
            <ControlledDocViewer
              ref={this.docViewerRef as any}
              pluginRenderers={DocViewerRenderers}
              documents={this.getDocuments()}
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                  retainURLParams: false,
                },
              }}
              style={{ height: this.state.viewerHeight }}
            />
          </div>
          <div className="left-panel">
            <div className="shapes-container">
              {this.state.shapes.map((shape, index) => (
                <DraggableCard key={index} shape={shape} onRemove={() => this.removeShape(index)} />
              ))}
            </div>
            <div className="button-shape-container">
              <button onClick={() => this.addShape("square")}>square</button>
              <button onClick={() => this.addShape("circle")}>circle</button>
              <button onClick={() => this.addShape("triangle")}>
                triangle
              </button>
            </div>
          </div>
        </div>
        <footer
          style={{
            position: "sticky",
            bottom: "0",
            backgroundColor: "#f1f1f1",
            textAlign: "center",
            padding: "10px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="button-link" onClick={this.toggleFileType}>
            Chuyển đổi
          </button>
        </footer>
      </>
    );
  }
}

export default DocumentViewer;
