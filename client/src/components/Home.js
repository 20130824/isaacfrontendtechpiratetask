import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

class Home extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			selectedFile: null,
            imageSrc : "",
            loading: false,
            status : "Sumbit"
		}
	}

	singleFileChangedHandler = ( event ) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};


	singleFileUploadHandler = ( event ) => {
		const data = new FormData();
		if ( this.state.selectedFile ) {
		    if (this.state.selectedFile.size < 1073741824)  {
            console.log("Size: " + this.state.selectedFile.size);
            this.setState({loading: true});
                this.setState({status: "Uploading Image"});
            data.append('imageToUpload', this.state.selectedFile, this.state.selectedFile.name);
            axios.post('/api/profile/img-upload', data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
                .then((response) => {
                    if (200 === response.status) {

                        if (response.data.error) {
                            this.setState({loading: false});
                            if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                                this.ocShowAlert('Max size: 1 GB', 'red');
                            } else {
                                console.log(response.data);

                                this.ocShowAlert(response.data.error, 'red');
                            }
                        } else {
                            // Success
                            let fileName = JSON.parse(JSON.stringify(response.data));
                            let thumbnailUrl = fileName['location'];
                            console.log(fileName['location']);

                            axios({
                                method: 'post',
                                url: "https://cav7iwutsh.execute-api.us-east-2.amazonaws.com/prod/upload-on-s3",
                                headers: {},
                                data: {
                                    'url': thumbnailUrl,
                                    'name': this.state.selectedFile.name,
                                }
                            }).then(res => {
                                let responseJson = JSON.parse(JSON.stringify(res.data));
                                console.log("el thumbnail: " + responseJson['urlTh']);
                                // console.log(this.state.imageSrc);
                                this.setState({loading: false});
                                this.setState({status: "Submit"});
                                this.setState({
                                    imageSrc: responseJson['urlTh'],
                                })
                            });
                            this.setState({status: "Generating Thumbnail"});
                            this.ocShowAlert('File Uploaded', '#3089cf');
                        }
                    }
                }).catch((error) => {
                this.setState({loading: false});
                this.ocShowAlert(error, 'red');
            });

        } else {
                this.ocShowAlert( 'Maximum file size = 1 GB!!', 'red' );
        }
		} else {

			this.ocShowAlert( 'Please upload file', 'red' );
		}
	};



	// ShowAlert Function
	ocShowAlert = ( message, background = '#3089cf' ) => {
		let alertContainer = document.querySelector( '#oc-alert-container' ),
			alertEl = document.createElement( 'div' ),
			textNode = document.createTextNode( message );
		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
		$( alertEl ).css( 'background', background );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );
		setTimeout( function () {
			$( alertEl ).fadeOut( 'slow' );
			$( alertEl ).remove();
		}, 3000 );
	};

	render() {
        const { loading } = this.state;
		console.log( this.state );
		return(
			<div className="container">

				<div id="oc-alert-container"></div>

				<div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
					<div className="card-header">
						<h3 style={{ color: '#555', marginLeft: '12px' }}>Upload Image</h3>
						<p className="text-muted" style={{ marginLeft: '12px' }}>Maximum size 1 gb</p>
					</div>
					<div className="card-body">
						<p className="card-text">Select your image!</p>

						<input type="file" onChange={this.singleFileChangedHandler}/>

                        <img src={this.state.imageSrc}/>
						<div className="mt-5">
                            <button className="button" onClick={this.singleFileUploadHandler} disabled={loading}>
                                {loading && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}
                                {loading && <span>{this.state.status}</span>}
                                {!loading && <span>{this.state.status}</span>}
                            </button>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Home;