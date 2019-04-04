import React, { Component } from 'react';
import './App.css';
import FileDrop from 'react-file-drop';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      act: 0,
      index: '',
      datas: [
        { name: 'jay', address: 'ahmedabad' },
        { name: 'jay', address: 'ahmedabad' },
        { name: 'jay', address: 'ahmedabad' },
        { name: 'jay', address: 'ahmedabad' },
        { name: 'jay', address: 'ahmedabad' },
        { name: 'jay', address: 'ahmedabad' },
        { name: 'jay', address: 'ahmedabad' },

      ],
    }
  }
  componentDidMount() {
    this.refs.name.focus();
  }
  onSubmit(e) {
    e.preventDefault();
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    if (this.state.act === 0) {
      let data = { name, address };
      datas.push(data);
    }
    else {
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }

    this.setState({
      datas: datas
    })
    this.refs.myForm.reset();
    this.refs.name.focus();
  }
  onRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    })
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  onEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.setState({
      act: 1,
      index: i
    })
  }
  handleDrop = (files, event) => {
    const firstFile = files[0];
    localStorage.clear();
    getBase64(firstFile).then(base64 => {
      localStorage.setItem("firstImage", base64);
      localStorage["firstImageName"] = firstFile.name;
    });
    setTimeout(function () { alert('file uploaded to localstorage') }, 100)
  }
  
  render() {
    let datas = this.state.datas;

    return (
      <div className="App">
        <h1>Simple React Crud Application</h1>

        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="name" className="formField" />
          <input type="text" ref="address" placeholder="address" className="formField" />
          <button onClick={(e) => this.onSubmit(e)} className="myButton">Insert</button>
        </form>

        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myListItems">
              {i + 1}. {data.name}, {data.address}
              <button onClick={() => this.onRemove(i)} className="myButton"> Remove</button>
              <button onClick={() => this.onEdit(i)} className="myButton"> Edit</button>

            </li>
          )}
        </pre>

        <div className="container"><h1>Drag and Drop Image Here</h1> 
      <div id="react-file-drop-demo" className="drop-demo">
            <FileDrop onDrop={this.handleDrop}>
              Drop some files here!
            </FileDrop>
          </div>
        </div>
      </div>
    );
  }
}
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

export default App;
