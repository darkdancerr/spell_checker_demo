import React from 'react';

class Popup extends React.Component {
    render() {
        return (
            <div className='modal'>
                <div className='modal_content'>
                    <h1>Misspelled words</h1>
                    <div>
                        {this.props.misspelledWords.map(txt => <p>{txt}</p>)}
                    </div>
                    <h3>Do you want to download document with corrected words?</h3>
                    <button onClick={this.props.downloadDocument}>Yes</button>
                    <button onClick={this.props.closePopup}>No</button>
                </div>
            </div>
        );
    }
}

export default Popup;
