import React, { Component } from 'react';
import Popup from './components/Popup';
import axios from 'axios';

const uploadEndpoint = 'http://localhost:5000/documents';
const downloadEndpoint = 'http://localhost:5000/documents/';

class App extends Component {
    state = {
        selectedFile: null,
        misspelledWords: null,
        documentId: null,
        message: 'Choose a file...',
        defaultMessage: 'Choose a file...',
        showPopup: false
    };
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    };
    downloadDocument() {
        axios.get(downloadEndpoint + this.state.documentId)
            .then(response => {
                const element = document.createElement("a");
                const file = new Blob([response.data], {type: 'text/plain'});
                element.href = URL.createObjectURL(file);
                element.download = "corrected.txt";
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();
            });
        this.togglePopup();
    }
    handleFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            message: event.target.files[0]
                ? event.target.files[0].name
                : this.state.defaultMessage
        });
    };
    handleUpload = (event) => {
        event.preventDefault();
        if (!this.state.selectedFile) {
            this.setState({ message: 'Select a file first' });
            return;
        }
        const data = new FormData();
        data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        axios.post(uploadEndpoint, data)
            .then((res) => {
                this.setState({
                    misspelledWords: res.data.misspelledWords,
                    documentId: res.data.id,
                    message: 'Uploaded successfully'
                });
                this.togglePopup();
            })
            .catch(err => {
                console.log('Failed to upload');
                console.log(err);
                this.setState({
                    message: 'Failed to upload'
                });
            });
    };
    render() {
        return (
            <div>
                <form className='App'>
                    <input type='file' name='file' onChange={this.handleFileChange} />
                    <button onClick={this.handleUpload}>Upload</button>
                    <span>
                        {this.state.message}
                    </span>
                </form>
                {this.state.showPopup ?
                    <Popup
                        misspelledWords={this.state.misspelledWords}
                        downloadDocument={this.downloadDocument.bind(this)}
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>

    );
    }
}

export default App;
