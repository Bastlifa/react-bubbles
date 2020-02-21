import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState({color: '', code: {hex: ''}})

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res =>
        {
          // console.log("res from saveEdit", res)
          updateColors(colors.map(color => color.id === colorToEdit.id ? res.data : color))
          // console.log("colors after update", colors)
          setEditing(false)
        })
      .catch(err =>
        {
          console.log("err from saveEdit", err)
        })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res =>
        {
          console.log("res from deleteColor", res)
          updateColors(colors.filter(c => c.id !== color.id))
          console.log("colors after delete", colors)
        })
      .catch(err =>
        {
          console.log("err from delete color", err)
        })
  };

  const addColor = event => 
  {
    event.preventDefault()
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, colorToAdd)
      .then(res =>
        {
          console.log("res from addColor", res)
          updateColors([...colors, res.data[res.data.length - 1]])
          console.log("colors after add", colors)
          setColorToAdd({color: '', code: {hex: ''}})
        })
      .catch(err =>
        {
          console.log("err from addColor", err)
        })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={(event) => {
            if(event.target.className !== "delete") editColor(color)
            }}
          >
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({...colorToAdd, color: e.target.value})
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({...colorToAdd, code: {hex: e.target.value}})
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <button className="add-button">Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
