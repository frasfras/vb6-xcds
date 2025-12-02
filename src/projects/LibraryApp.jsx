import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import { Rnd } from "react-rnd";

import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  TextField,
  Select,
} from "react95";
import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";

/* -------------------------
   Helper to generate unique IDs
-------------------------- */
const genId = () => "id_" + Math.random().toString(36).slice(2);

/* -------------------------
   Main App
-------------------------- */
export default function LibraryApp() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    type: "Book",
    mediaFile: "",
    coverImage: "",
    description: "",
  });

  /* Load sample data for demo */
  useEffect(() => {
    setItems([
      {
        id: genId(),
        title: "The Matrix",
        author: "The Wachowskis",
        type: "Movie",
        mediaFile:
          "https://www.w3schools.com/html/mov_bbb.mp4",
        coverImage:
          "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
        description: "Sci-fi classic",
      },
      {
        id: genId(),
        title: "Bohemian Rhapsody",
        author: "Queen",
        type: "Music",
        mediaFile:
          "https://www.w3schools.com/html/horse.mp3",
        coverImage:
          "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png",
        description: "Classic rock",
      },
    ]);
  }, []);

  /* -------------------------
     Open Detail Window
  -------------------------- */
  const openDetail = (item) => {
    if (item) setFormValues({ ...item });
    else
      setFormValues({
        title: "",
        author: "",
        type: "Book",
        mediaFile: "",
        coverImage: "",
        description: "",
      });
    setDetailOpen(true);
  };

  /* -------------------------
     Save item
  -------------------------- */
  const saveItem = () => {
    if (formValues.id) {
      // Update
      setItems(items.map((i) => (i.id === formValues.id ? formValues : i)));
    } else {
      // Add new
      setItems([...items, { ...formValues, id: genId() }]);
    }
    setDetailOpen(false);
  };

  /* -------------------------
     Delete item
  -------------------------- */
  const deleteItem = () => {
    if (!selectedItem) return;
    setItems(items.filter((i) => i.id !== selectedItem.id));
    setSelectedItem(null);
  };

  return (
    <div>
      {/* -------------------------
          Library Grid Window
      -------------------------- */}
      <Rnd
        default={{ x: 20, y: 20, width: 500, height: 400 }}
        dragHandleClassName="drag-handle"
      >
        <Window style={{ width: "100%", height: "100%" }}>
          <WindowHeader className="drag-handle">Library</WindowHeader>
          <WindowContent style={{ overflowY: "auto" }}>
            <table
              style={{ width: "100%", borderCollapse: "collapse" }}
              border={1}
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author/Artist</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedItem?.id === item.id ? "#c0c0c0" : "",
                    }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 10 }}>
              <Button onClick={() => openDetail(null)}>Add Item</Button>
              <Button
                onClick={() => openDetail(selectedItem)}
                disabled={!selectedItem}
              >
                Edit Item
              </Button>
              <Button onClick={deleteItem} disabled={!selectedItem}>
                Delete Item
              </Button>
            </div>
          </WindowContent>
        </Window>
      </Rnd>

      {/* -------------------------
          Cover Image Preview
      -------------------------- */}
      {selectedItem && selectedItem.coverImage && (
        <Rnd default={{ x: 540, y: 20, width: 200, height: 250 }}>
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader>Cover Image</WindowHeader>
            <WindowContent>
              <img
                src={selectedItem.coverImage}
                alt="cover"
                style={{ width: "100%" }}
              />
            </WindowContent>
          </Window>
        </Rnd>
      )}

      {/* -------------------------
          Media Preview
      -------------------------- */}
      {selectedItem && selectedItem.mediaFile && (
        <Rnd default={{ x: 540, y: 290, width: 300, height: 100 }}>
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader>Media Preview</WindowHeader>
            <WindowContent>
              {selectedItem.type === "Music" ? (
                <audio controls style={{ width: "100%" }}>
                  <source src={selectedItem.mediaFile} />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <video
                  controls
                  style={{ width: "100%", maxHeight: 200 }}
                >
                  <source src={selectedItem.mediaFile} />
                  Your browser does not support the video element.
                </video>
              )}
            </WindowContent>
          </Window>
        </Rnd>
      )}

      {/* -------------------------
          Item Detail Window
      -------------------------- */}
      {detailOpen && (
        <Rnd default={{ x: 100, y: 100, width: 400, height: 400 }}>
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader className="drag-handle">
              Item Detail
            </WindowHeader>
            <WindowContent style={{ display: "flex", flexDirection: "column" }}>
              <label>Title</label>
              <TextField
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
              />
              <label>Author/Artist</label>
              <TextField
                value={formValues.author}
                onChange={(e) =>
                  setFormValues({ ...formValues, author: e.target.value })
                }
              />
              <label>Type</label>
              <Select
                options={["Book", "Movie", "Music"]}
                value={formValues.type}
                onChange={(e) =>
                  setFormValues({ ...formValues, type: e.target.value })
                }
              />
              <label>Media File URL</label>
              <TextField
                value={formValues.mediaFile}
                onChange={(e) =>
                  setFormValues({ ...formValues, mediaFile: e.target.value })
                }
              />
              <label>Cover Image URL</label>
              <TextField
                value={formValues.coverImage}
                onChange={(e) =>
                  setFormValues({ ...formValues, coverImage: e.target.value })
                }
              />
              <label>Description</label>
              <TextField
                multiline
                rows={3}
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
              />
              <div style={{ marginTop: 10 }}>
                <Button onClick={saveItem}>Save</Button>
                <Button onClick={() => setDetailOpen(false)}>Cancel</Button>
              </div>
            </WindowContent>
          </Window>
        </Rnd>
      )}
    </div>
  );
}
