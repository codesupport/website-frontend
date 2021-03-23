import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLink, faUpload} from "@fortawesome/free-solid-svg-icons";
import Image from "../atoms/Image";

const Images = styled("ul")`
	padding: 0;
	list-style: none;
`;

const ImageRow = styled("li")`
	display: grid;
	grid-template-columns: 50px auto 15px;
	grid-column-gap: 5px;
	margin-bottom: 15px;
	line-height: 50px;
	
	img {
		width: 50px;
		height: 50px;
	}
`;

const CopyLink = styled("span")`
	text-align: right;
`;

class ImageManager extends Component {
	render() {
		return (
			<section>
				<h2>Images</h2>

				<div className="js-upload uk-placeholder uk-text-center">
					<span className="uk-text-middle">
						<FontAwesomeIcon icon={faUpload} /> Upload images by dropping them here or
						{" "}
						<span className="uk-link">selecting one</span>.
					</span>
				</div>
				<Images>
					<ImageRow className="image-row">
						<Image src="https://placehold.it/1920x1080"/>
						<span>my-image.png</span>
						<CopyLink>
							<FontAwesomeIcon icon={faLink} />
						</CopyLink>
					</ImageRow>
					<ImageRow className="image-row">
						<Image src="https://placehold.it/1920x1080"/>
						<span>my-image.png</span>
						<CopyLink>
							<FontAwesomeIcon icon={faLink} />
						</CopyLink>
					</ImageRow>
					<ImageRow className="image-row">
						<Image src="https://placehold.it/1920x1080"/>
						<span>my-image.png</span>
						<CopyLink>
							<FontAwesomeIcon icon={faLink} />
						</CopyLink>
					</ImageRow>
					<ImageRow className="image-row">
						<Image src="https://placehold.it/1920x1080"/>
						<span>my-image.png</span>
						<CopyLink>
							<FontAwesomeIcon icon={faLink} />
						</CopyLink>
					</ImageRow>
				</Images>
			</section>
		);
	}
}

export default ImageManager;