import FamilyTreeDataModal from "@/components/modal/FamilyTreeDataModal";
import SelectRelationModal from "@/components/modal/SelectRelationModal";
import {
  updatePartner,
  addChildren,
  addParent,
  uploadImage,
  uploadImageFamilyTree,
  getTreeData,
  resetTreeData,
  setBookData,
  getBookData

} from "@/store/slices/chatSlice";
import { getBookInterior } from "@/store/slices/authSlice";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Backdrop, Box, Button, IconButton, Typography } from "@mui/material";
import * as d3 from "d3";
import { zoom } from "d3";
import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useDispatch } from "react-redux";
import styles from "./FamilyTree.module.css";
import { saveSvgAsPng, svgAsPngUri, svgAsDataUri } from "save-svg-as-png";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import LogoSvg from "@/_assets/svg/logo.svg";
import FamilyTreeSVG from "@/_assets/svg/family-tree-svg.svg";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";
import FamilyTreeAddModal from "@/components/modal/FamilyTreeAddModal";
import { ClassNames } from '@emotion/react';
import GlobelBtn from '@/components/button/Button';
import TransitionsDialog from '@/components/modal/TransitionDialog';
import Right from "@/_assets/svg/arrow-right.svg"
import Reset from "@/_assets/svg/reset-family.svg"
import DownloadFamily from "@/_assets/svg/download-family.svg"
import ZoomIn from "@/_assets/svg/zoomin.svg"
import ZoomOut from "@/_assets/svg/zoom-out.svg"
import Image from 'next/image';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MultiToolTip from "@/__webComponents/tooltip/MultiToolTip"

const FamilyTree = ({ familyTreeData }) => {
  const svgRef = useRef();
  const dispatch: any = useDispatch();
  const [familyModal, setFamilyModal] = useState(false);
  const [familyEditModal, setFamilyEditModal] = useState(false);
  const [familyRelationModal, setFamilyRelationModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedNode, setUpdatedNode] = useState({});
  const [nodeData, setNodeData] = useState(null);
  const [selectedRelation, setSelectedRelation] = useState(undefined);
  const [relations, setRelations] = useState(["Sibling", "Child"]);
  const [personData, setPersonData] = useState({});
  const [dd, setDd] = useState({});
  const [isPartner, setIsPartner] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState(null);
  const [resetModal, setResetModal] = useState(false)
  const [saveTreeModal, setSaveTreeModal] = useState(false)
  const [removeTreeModal, setRemoveTreeModal] = useState(false)
  const [hover, setHover] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isShown, setIsShown] = useState(false)
  // const profileIcon =
  //   "https://res.cloudinary.com/dm3wjnhkv/image/upload/v1704374174/thelifescript/b7wxd4jnck7pbmzz4vdu.jpg";

  const Male = "./familyTreeRelations/male.svg";
  const Female = "./familyTreeRelations/female.svg";


  useEffect(() => {
    const jwt = require("jsonwebtoken");
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      const accessRole = decodedToken.accessRole;
      if (accessRole !== "FreePlan") {
        setIsPremium(true);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getBookData())
      .unwrap()
      .then((res) => {
        setIsShown(res[0]?.isInclude);
      })
  }, [])

  const handleAddedPerson = (data) => {
    setFamilyModal(false);
    setSelectedNode(null);
    setUpdatedNode({});
    const { relationType, ...newData } = data;

    if (relationType === "Parent") {
      addParents(newData);
    } else if (relationType === "Child") {
      addChild(newData);
    } else if (relationType === "Partner") {
      addPartner(newData);
    } else if (relationType === "Sibling") {
      addSibling(newData);
    } else {
      addPartner(newData);
    }
  };

  const addPartner = (data) => {
    let partnerData;
    if (data?.isSpouse === false) {
      partnerData = {
        nodeId: selectedNode?.data?._id,
        name: data.name,
        born: data.born,
        died: data.died,
        gender: data.gender,
        image: data.image,
        location: data.location,
      };
    } else {
      partnerData = {
        nodeId: selectedNode?.data?._id,
        spouseName: data.name,
        spouseBorn: data.born,
        spouseDied: data.died,
        spouseGender: data.gender,
        spouseImage: data.image,
        spouseLocation: data.location,
      };
    }

    dispatch(updatePartner(partnerData))
      .unwrap()
      .then(() => {
        setUpdatedNode({});
        setNodeData(null);
      });
  };

  const addParents = (data) => {
    let parentData = {
      name: data.name,
      born: data.born,
      died: data.died,
      gender: data.gender,
      image: data.image,
      location: data.location,
    };

    dispatch(addParent(parentData))
      .unwrap()
      .then(() => {
        setUpdatedNode({});
        setNodeData(null);
      });
  };

  const addChild = (data) => {
    let childData = {};
    if (data?.isSpouse === true) {
      childData = {
        nodeId: selectedNode?.data?._id,
        spouseName: data.name,
        spouseBorn: data.born,
        spouseDied: data.died,
        spouseGender: data.gender,
        spouseImage: data.image,
        spouseLocation: data.location,
      };
    } else {
      childData = {
        nodeId: selectedNode?.data?._id,
        name: data.name,
        born: data.born,
        died: data.died,
        gender: data.gender,
        image: data.image,
        location: data.location,
      };
    }

    dispatch(addChildren(childData))
      .unwrap()
      .then(() => {
        setUpdatedNode({});
        setNodeData(null);
      });
  };

  const addSibling = (data) => {
    let childData = {
      nodeId: selectedNode?.parent?.data?._id,
      name: data.name,
      born: data.born,
      died: data.died,
      gender: data.gender,
      image: data.image,
      location: data.location,
    };

    dispatch(addChildren(childData))
      .unwrap()
      .then(() => {
        setUpdatedNode({});
        setNodeData(null);
      });
  };

  const handleIconClick = (name, iconType, d) => {


    setUpdatedNode({});
    setFamilyEditModal(false);
    setRelations(["Sibling", "Child"]);
    if (iconType === "editspouse") {


      handleEditSpouse(name, d);
    } else if (iconType === "add") {


      handleAdd(name, d);
    } else if (iconType === "edit") {
      handleEdit(name, d);

    }
  };

  const handleEditSpouse = (name, d) => {
    // Implement your logic for handling edit
    setUpdatedNode({ isSpouse: true, ...d?.data });
    setSelectedNode(d);
    setFamilyModal(true);
  };

  const handleEdit = (name, d) => {
    // Implement your logic for handling edit
    setSelectedRelation(undefined);
    setUpdatedNode({ isSpouse: false, ...d?.data });

    setSelectedNode(d);
    setFamilyModal(true);
  };

  const handleAdd = (name, d) => {
    setUpdatedNode({});
    setNodeData(null);
    const isSpouse = d?.data?.name ? false : true;
    setSelectedNode({ isSpouse: isSpouse, ...d });
    !d?.parent?.data?.name &&
      !d?.parent?.data?.spouseName &&
      setRelations((prev) => [...prev, "Parent"]);
    !d?.data?.spouseName && setRelations((prev) => [...prev, "Partner"]);
    setFamilyRelationModal(true);
  };

  useEffect(() => {
    if (!familyTreeData) {


      return;
    } else {

      const svgElement = d3.select(svgRef.current);
      d3.select(svgRef.current).selectAll("*").remove();
      d3.select("#download").on("click", function () {
        svgElement.attr("viewBox", "0 0 0 0");

        setLoading(true);

        // Clear previous tree
        svgElement.selectAll("*").remove();

        // Reset any transformations
        svgElement.attr("transform", "translate(0,0) scale(1)");

        // Redraw the tree
        drawTree();


        const { src, height } = LogoSvg;
        // const { src: srcFamily, width: widthFamily } = FamilyTreeSVG;
        const mainSvg = d3.select(svgRef.current);
        const familyTreeGroup = mainSvg
          .append("g")
          .attr("id", "familyTreeGroup")
          .attr("transform", "scale(1.8)");
        const familyTreeGroupFamily = mainSvg
          .append("g")
          .attr("id", "familyTreeGroupFamily")
          .attr("transform", `translate(0, ${60}) scale(0.2)`);

        d3.xml(src).then((data) => {
          const externalSvgContent = d3.select(data).select("svg");

          familyTreeGroup.html(externalSvgContent.html());

          // d3.xml(srcFamily).then((dataFamily) => {
          // const externalSvgContentFamily = d3
          //   .select(dataFamily)
          //   .select("svg");
          // familyTreeGroupFamily.html(externalSvgContentFamily.html());


          const fullName =
            typeof window !== "undefined"
              ? localStorage.getItem("username")
              : null;

          const firstName = fullName ? fullName.split(" ")[0] : null;

          // Add a separation between the two external SVGs
          const newY = height + 60;

          // Append the second external SVG below the first one
          familyTreeGroupFamily.append("g").attr("id", "secondExternalSvg");

          // Add dynamic text below the second logo
          familyTreeGroupFamily
            .append("text")
            // .attr("x", widthFamily + 180) // Adjust the x-coordinate as needed
            .attr("y", newY) // Adjust the y-coordinate as needed
            .attr("text-anchor", "start") // Adjust text-anchor as needed (start, middle, end)
            .attr("fill", "black") // Adjust the text color
            .style("font-size", "110px")
            .style("font-weight", "140px")
            .style("color", "#1D2D20")
            .text(`${firstName} Family Tree`);

          // Calculate bounding box
          const bbox = mainSvg.node().getBBox();
          const bboxWidth = bbox.width;
          const bboxHeight = bbox.height;

          // Center the SVG content
          mainSvg.attr(
            "viewBox",
            `${bbox.x - 20} ${bbox.y - 20} ${bboxWidth + 40} ${bboxHeight + 40}`
          );

          saveSvgAsPng(mainSvg.node(), "familytree.png", {
            scale: 1,
            backgroundColor: "#FFFFFF",
          }).then((data) => {

            setLoading(false);
            familyTreeGroup.remove();
            familyTreeGroupFamily.remove();
          });

          svgAsPngUri(mainSvg.node(), "familytree.png", {
            scale: 1,
            backgroundColor: "#FFFFFF",
          }).then((uri) => {


            fetch(uri)
              .then((response) => response.blob())
              .then((imgBlob) => {
                const formData = new FormData();
                setLoading(false);
                formData.append("image", imgBlob);
                // uploadImageonCloud(formData);
                familyTreeGroup.remove();
                familyTreeGroupFamily.remove();
              });
          });
          // });
        });
      });
      drawTree();

    }
  }, [familyTreeData]);

  const panCanvas = (direction) => {
    const scaleFactor = 0.3;
    const svgElement = d3.select(svgRef.current);
    const viewBox = svgElement.attr("viewBox") ? svgElement.attr("viewBox").split(" ").map(Number) : [0, 0, 1000, 1000];
    const moveDistance = 100 * scaleFactor; // Adjust this value to control the panning speed

    switch (direction) {
      case 'top':
        svgElement.attr("viewBox", `${viewBox[0]} ${viewBox[1] - moveDistance} ${viewBox[2]} ${viewBox[3]}`);

        break;
      case 'left':
        svgElement.attr("viewBox", `${viewBox[0] - moveDistance} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`);
        break;
      case 'bottom':
        svgElement.attr("viewBox", `${viewBox[0]} ${viewBox[1] + moveDistance} ${viewBox[2]} ${viewBox[3]}`);
        break;
      case 'right':
        svgElement.attr("viewBox", `${viewBox[0] + moveDistance} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`);
        break;
      default:
        break;
    }
  };

  const zoomCanvas = (zoomIn) => {
    const svgElement = d3.select(svgRef.current);
    const viewBox = svgElement.attr("viewBox") ? svgElement.attr("viewBox").split(" ").map(Number) : [0, 0, 1000, 1000];
    const zoomFactor = zoomIn ? 0.9 : 1.1; // Adjust these values to control the zoom speed

    const currentWidth = viewBox[2];
    const currentHeight = viewBox[3];
    const newWidth = currentWidth * zoomFactor;
    const newHeight = currentHeight * zoomFactor;

    const deltaX = (newWidth - currentWidth) / 20;
    const deltaY = (newHeight - currentHeight) / 20;

    const newX = viewBox[0] - deltaX;
    const newY = viewBox[1] - deltaY;

    const finalX = zoomIn ? newX - 5 : newX

    svgElement.attr("viewBox", `${finalX} ${newY} ${newWidth} ${newHeight}`);
  };

  const AddTreeHandler = () => {
    const svgElement = d3.select(svgRef.current);

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    svgElement.attr("viewBox", "0 0 0 0");

    setLoading(true);

    // Clear any existing SVG content again
    svgElement.selectAll("*").remove();
    svgElement.attr("transform", "translate(0,0) scale(1)");

    // Generate the tree without displaying it
    drawTree();

    const { src, height } = LogoSvg;
    const mainSvg = d3.select(svgRef.current);
    const familyTreeGroup = mainSvg.append("g").attr("id", "familyTreeGroup").attr("transform", "scale(1.8)");
    const familyTreeGroupFamily = mainSvg.append("g").attr("id", "familyTreeGroupFamily").attr("transform", `translate(0, ${60}) scale(0.2)`);

    d3.xml(src).then((data) => {
      const externalSvgContent = d3.select(data).select("svg");

      // Add external SVG content to the group
      familyTreeGroup.html(externalSvgContent.html());

      const fullName = typeof window !== "undefined" ? localStorage.getItem("username") : null;
      const firstName = fullName ? fullName.split(" ")[0] : null;

      const newY = height + 60;

      // Append the second external SVG below the first one
      familyTreeGroupFamily.append("g").attr("id", "secondExternalSvg");

      // Add dynamic text below the second logo
      familyTreeGroupFamily
        .append("text")
        .attr("y", newY)
        .attr("text-anchor", "start")
        .attr("fill", "black")
        .style("font-size", "110px")
        .style("font-weight", "140px")
        .style("color", "#1D2D20")
        .text(`${firstName} Family Tree`);

      // Calculate bounding box
      const bbox = mainSvg.node().getBBox();
      const bboxWidth = bbox.width;
      const bboxHeight = bbox.height;

      // Center the SVG content
      mainSvg.attr("viewBox", `${bbox.x - 20} ${bbox.y - 20} ${bboxWidth + 40} ${bboxHeight + 40}`);

      svgAsPngUri(mainSvg.node(), "familytree.png", {
        scale: 1,
        backgroundColor: "#FFFFFF",
      }).then((uri) => {
        fetch(uri)
          .then((response) => response.blob())
          .then((imgBlob) => {
            const formData = new FormData();
            formData.append("image", imgBlob);
            uploadImageonCloud(formData);

            // Clear the SVG groups after uploading
            familyTreeGroup.remove();
            familyTreeGroupFamily.remove();

            setLoading(false);
          });
      });
    });

    dispatch(setBookData({ isInclude: true }))
      .unwrap()
      .then(() => {
        setSaveTreeModal(false);
        setIsShown(true);
      });
  };


  const cancleTreeHandler = () => {
    dispatch(setBookData({ isInclude: false }))
      .unwrap()
      .then((res) => {
        toast.success("Remove Tree from the book");

      })
      .catch(() => toast.error("Failed to remove tree from the book "));

    setRemoveTreeModal(false);
    setIsShown(false);

  }


  const uploadImageonCloud = (formData) => {

    dispatch(uploadImageFamilyTree(formData))
      .unwrap()
      .then((res) => {
        toast.success("Family tree added successfully");

      })
      .catch(() => toast.error("Failed to upload image"));
  };

  const drawTree = () => {
    const totalNodes = d3.hierarchy(familyTreeData, (d) => d.childrens);

    // Calculate the maximum number of siblings in any generation
    const maxSiblings = Math.max(...totalNodes.descendants().map(d => d.children ? d.children.length : 0));

    // Define the height per sibling
    const heightPerSibling = 300;  // Adjust as needed
    const baseHeight = 500;  // Minimum base height

    // Calculate the dynamic height
    const dynamicHeight = Math.max(baseHeight, maxSiblings * heightPerSibling);

    const rightMargin = 1100 - (totalNodes.height - 1) * 200;
    const margin = { top: 10, right: rightMargin, bottom: 10, left: 10 };
    const fullWidth = 1200;
    const fullHeight = dynamicHeight + margin.top + margin.bottom;
    const width = fullWidth - margin.left - margin.right;
    const height = fullHeight - margin.top - margin.bottom;

    const tree = d3
      .tree()
      .separation((a, b) => {
        return a.children && a.children === b.children ? 1 : 0.5;
      })
      .size([height, width]);

    const svg = d3
      .select(svgRef.current)
      .attr("width", fullWidth)
      .attr("height", fullHeight);

    const zoomBehavior = zoom()
      .scaleExtent([0.1, 4]) // Set zoom limits
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoomBehavior);

    svg.append("style").text(`
      body { margin:0;position:fixed;top:0;right:0;bottom:0;left:0; }
      text { font-family: "Helvetica Neue", Helvetica, sans-serif; color: white !important }
    `);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const elbow = (d, i) => {
      const yOffset = d.target.data.spouseName ? -55 : 0;
      return `M${d.source.y + 50},${d.source.x}H${d.target.y}V${d.target.x + yOffset
        }H${d.target.y + 10}`;
    };

    const nodes = d3.hierarchy(familyTreeData, (d) => d.childrens);

    const treeNodes = tree(nodes);
    const descendants = treeNodes.descendants().slice(1);
    const links = treeNodes.links().filter((link) => link.source.depth > 0);

    const link = g
      .selectAll(".link")
      .data(links) //treeNodes.links()
      .enter()
      .append("path")
      .attr("class", `${styles.link}`)
      .attr("d", elbow);

    const node = g
      .selectAll(".node")
      .data(descendants) //treeNodes.descendants()
      .enter()
      .append("g")
      .attr("class", `${styles.node}`)
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node.each(function (d) {
      renderNode(d3.select(this), d);
    });
  };

  const renderNode = (personNode, d) => {
    const handleNodeClick = (isSpouse) => {
      setIsPartner(isSpouse)
      setDd(d);
      setFamilyEditModal(true);
    };


    const renderRect = (x, y, height, className, isSpouse) => {
      const rect = personNode.append("rect")
        .attr("class", className)
        .attr("x", x)
        .attr("rx", 60)
        .attr("y", y)
        .attr("width", 100)
        .attr("height", height)
        .on("click", () => handleNodeClick(isSpouse));
    };

    const renderText = (x, y, text, className, isSpouse) => {
      const textElement = personNode.append("text")
        .attr("class", className)
        .attr("x", x)
        .attr("y", y)
        .text(text)
        .on("click", () => handleNodeClick(isSpouse));
    };


    const renderImage = (x, y, image, className, isSpouse) => {
      const clipPathId = `clipPath-${x}-${y}`;

      personNode.append("clipPath")
        .attr("id", clipPathId)
        .append("circle")
        .attr("cx", x + 35) // Center of the circle is at (x + radius)
        .attr("cy", y + 35) // Center of the circle is at (y + radius)
        .attr("r", 35); // Radius of the circle

      const imgElement = personNode.append("image")
        .attr("xlink:href", image)
        .attr("width", 70)
        .attr("height", 70)
        .attr("x", x)
        .attr("y", y)
        .attr("class", className)
        .attr("clip-path", `url(#${clipPathId})`) // Apply the clipPath
        .attr("preserveAspectRatio", "xMidYMid slice") // Preserve aspect ratio and slice to cover
        .on("click", () => handleNodeClick(isSpouse));
    };


    const renderForeignObject = (x, y, onClick, icon, d, iconType) => {
      personNode.append("foreignObject")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", x)
        .attr("y", y)
        .on("click", () => onClick(d, iconType)) // Pass the data and iconType to the onClick callback
        .html(() => ReactDOMServer.renderToString(icon));
    };

    const renderLine = (x1, y1, x2, y2) => {
      personNode
        .append("line")
        .attr("class", `${styles.connectionLine}`)
        .attr("x1", x1 - 60)
        .attr("y1", y1)
        .attr("x2", x2 - 60)
        .attr("y2", y2)
        .style("stroke", "#30422E")
        .style("stroke-width", 2)
    };

    if (d.data.spouseName) {


      renderRect(10, -5, 100, `${styles.nameRect}`, false);
      renderImage(
        20,
        -120,
        d.data.image || (d.data.gender == "Male" ? Male : Female),
        `${styles.circularImage}`, false
      );
      renderText(30, -32, d.data.name || "", `${styles.name}`, false);
      //age
      const born = d.data.born?.slice(0, 4);
      const died = d.data.died?.slice(0, 4);
      const age =
        born && died
          ? born + " - " + died
          : born
            ? "b. " + born
            : died
              ? "d. " + died
              : "b. Not Known";
      renderText(30, -18, age || "", `${styles.dateLocation}`, false);
      // renderText(76, -40, d.data.location || "", `${styles.dateLocation}`);
      //for spouse
      renderRect(10, 5, 100, `${styles.spouseRect}`, true);
      renderImage(
        14,
        10,
        d.data.spouseImage || (d.data.spouseGender == "Female" ? Female : Male),
        `${styles.circularImage}`, true
      );
      renderText(23, 94, d.data.spouseName || "", `${styles.name}`, true);
      const spouseBorn = d.data.spouseBorn?.slice(0, 4);
      const spouseDied = d.data.spouseDied?.slice(0, 4);
      let spouseAge =
        spouseBorn && spouseDied
          ? spouseBorn + " - " + spouseDied
          : spouseBorn
            ? "b. " + spouseBorn
            : spouseDied
              ? "d. " + spouseDied
              : "b. Not Known";
      renderText(23, 110, spouseAge || "", `${styles.dateLocation}`, true);
      // renderText(76, 70, d.data.spouseLocation, `${styles.dateLocation}`);

      const personBottomCenterX = 10 + 200 / 2;
      const personBottomCenterY = -115 + 100;
      const spouseTopCenterX = 10 + 200 / 2;
      const spouseTopCenterY = 10;

      renderLine(
        personBottomCenterX,
        personBottomCenterY,
        spouseTopCenterX,
        spouseTopCenterY
      );
    } else {
      const born = d.data.born?.slice(0, 4);
      const died = d.data.died?.slice(0, 4);
      const age =
        born && died
          ? born + " - " + died
          : born
            ? "b. " + born
            : died
              ? "d. " + died
              : "b. Not Known";
      renderRect(10, -50, 100, `${styles.nameRect}`, false);
      renderImage(
        14,
        -45,
        d.data.image || (d.data.gender == "Male" ? Male : Female),
        `${styles.circularImage}`, false
      );
      renderText(20, 39, d.data.name || "", `${styles.name}`, false);
      renderText(20, 55, age || "", `${styles.dateLocation}`, false);
    }
  };

  function handleResetFamily() {
    dispatch(resetTreeData())
    dispatch(getTreeData())
    setResetModal(false)
  }

  const content = [
    { title: "Add/Edit:", text: "Click an avatar to add or update information. " },
    { title: "Zoom:", text: "Use the + and - buttons for better view." },
    { title: "Preview:", text: "  Download the PDF to preview the family tree layout." },
    { title: "Note: ", text: " Deleting a member requires resetting the entire family tree." },
  ];

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isPremium && <IconButton id="download" aria-label="download" sx={{
            '&:hover': {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }} >
            <Box sx={{ width: "140px", border: "1px solid #e1693b", borderRadius: "4px", display: "flex", justifyContent: "center" }}>
              <ButtonIcons
                onClick={() => { }}
                img={DownloadFamily}
                iconSize={20}
                btnText="PDF"
              />
            </Box>
          </IconButton>}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
            <Box sx={{ width: "140px", height: "38px", border: "1px solid #e1693b", borderRadius: "4px", }}>
              <ButtonIcons
                onClick={() => setResetModal(true)}
                img={Reset}
                iconSize={20}
                btnText="Reset Tree"
              />
            </Box>
            <Box>
              <Box
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <InfoOutlinedIcon sx={{ color: "#7F886B" }} />
              </Box>

              {hover && (
                <Box
                  sx={{
                    display: {
                      md: "block",
                      xs: "block",
                    },
                    // position: "absolute", 
                    // mt: 1 
                  }}
                >
                  <MultiToolTip
                    content={content}
                    top={undefined} left={"115px"} bottom={undefined} right={undefined} position={"absolute"} />

                </Box>
              )}
            </Box>

          </Box>

        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ marginLeft: "20px" }}>
            <ButtonIcons
              onClick={() => zoomCanvas(false)}
              img={ZoomOut}
              iconSize={40}
              btnText=""
            />
          </Box>
          <Box sx={{ marginLeft: "-15px" }}>
            <ButtonIcons
              onClick={() => zoomCanvas(true)}
              img={ZoomIn}
              iconSize={40}
              btnText=""
            />
          </Box>
          <Box>
            <GlobelBtn
              onClick={() => { !isShown ? setSaveTreeModal(true) : setRemoveTreeModal(true) }}
              btnText={!isShown ? 'Add in book' : "Remove from book"}
            />
          </Box>
        </Box>

      </Box>
      <Box sx={{ position: "relative", bgcolor: "", height: "100%" }}>
        <Box>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "0%",
            left: "0%",
            transform: {
              md: "translate(-0%, -25%)",
              sm: "translate(-5%, -25%)",
              xs: "translate(-8%, -30%)",
            },
          }}
        >
          <svg
            id="familyTree"
            style={{ position: "absolute", top: "20px", left: "20px" }}
            ref={svgRef}
            viewBox="0 0 1800 1800"
          ></svg>
        </Box>




        <Box sx={{ position: "absolute", right: "0", top: "40%", transform: "translateY(-40%)" }}>
          <ButtonIcons
            onClick={() => panCanvas('right')}
            img={Right}
            iconSize={30}
            btnText=""
          />
        </Box>

        <Box sx={{ position: "absolute", left: "50%", top: "-65px", transform: "translateX(-50%) rotate(-90deg)" }}>
          <ButtonIcons
            onClick={() => panCanvas('top')}
            img={Right}
            iconSize={30}
            btnText=""
          />
        </Box>

        <Box sx={{ position: "absolute", left: "50%", bottom: "12%", transform: "translateX(-50%) rotate(90deg)" }}>
          <ButtonIcons
            onClick={() => panCanvas('bottom')}
            img={Right}
            iconSize={30}
            btnText=""
          />
        </Box>

        <Box sx={{ position: "absolute", left: "0", top: "40%", transform: "translateY(-40%) rotate(180deg)" }}>
          <ButtonIcons
            onClick={() => panCanvas('left')}
            img={Right}
            iconSize={30}
            btnText=""
          />
        </Box>









        {/* Modals  */}
        <SelectRelationModal
          relations={relations}
          familyRelationModal={familyRelationModal}
          setFamilyRelationModal={setFamilyRelationModal}
          setFamilyModal={setFamilyModal}
          onClick={(item) => {
            setFamilyRelationModal(false);

            setSelectedRelation(item);
            if (item === "Partner") {
              setUpdatedNode({ isSpouse: true });
            }
          }}
        />

        <FamilyTreeDataModal
          nodeData={updatedNode}
          familyModal={familyModal}
          setFamilyModal={setFamilyModal}
          selectedRelation={selectedRelation}
          onSubmit={handleAddedPerson}
        />

        <FamilyTreeAddModal
          familyEditModal={familyEditModal}
          setFamilyEditModal={setFamilyEditModal}
          nodeData={dd}
          onClick={handleIconClick}
          isSpouse={isPartner}
        />

        <TransitionsDialog
          open={resetModal}
          heading={"Delete Family Tree"}
          description="Do you want to delete the family?"
          cancel={() => setResetModal(false)}
          proceed={handleResetFamily}
          closeModal={() => setResetModal(false)}
        />

        <TransitionsDialog
          open={saveTreeModal}
          heading={"Add Family Tree"}
          description="Are you sure that you want to add your family tree in your book?"
          cancel={() => {
            setSaveTreeModal(false)
          }}
          proceed={AddTreeHandler}
          closeModal={() => setSaveTreeModal(false)}
        />

        <TransitionsDialog
          open={removeTreeModal}
          heading={"Remove Family Tree"}
          description="Are you sure that you want to remove your family tree from your book?"
          cancel={() => {
            setRemoveTreeModal(false)
          }}
          proceed={cancleTreeHandler}
          closeModal={() => setRemoveTreeModal(false)}
        />


      </Box>
    </>
  );
};

export default FamilyTree;


export const ButtonIcons = ({ onClick, iconSize, img, btnText }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: "8px",
        '&:hover': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}>
      <Image
        src={img}
        alt="icon"
        width={iconSize}
      />
      {btnText &&
        <Typography sx={{
          fontSize: "16px",
          color: "#e1693b"
        }}>
          {btnText}
        </Typography>}
    </Button>
  )
}
