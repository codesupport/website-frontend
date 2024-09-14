import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

const socialLinks = [
	{
		icon: faDiscord,
		link: "https://codesupport.dev/discord"
	},
	{
		icon: faTwitter,
		link: "https://twitter.com/codesupportdev"
	},
	{
		icon: faGithub,
		link: "https://github.com/codesupport"
	}
];

const SocialLinks = styled("ul")`
    max-width: 300px;
    margin: 0 auto;
    padding: 25px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    list-style: none;
`;

const SocialIcon = styled("li")`
  display: inline;
  font-size: 1.5rem;

  a {
    color: var(--text);
    transition: color 0.1s;

    :hover {
      color: var(--cs-blue);
    }
  }
`;

const Copyright = styled("p")`
    margin: 0;
    padding-bottom: 25px;
    text-align: center;
    font-size: var(--body-font-size);
`;

function Footer() {
	return (
		<footer>
			<SocialLinks>
				{socialLinks.map(({ icon, link }, i) =>
					<SocialIcon key={i}>
						<a target="_blank" href={link} rel="noopener noreferrer">
							<FontAwesomeIcon icon={icon} />
						</a>
					</SocialIcon>
				)}
			</SocialLinks>
			<Copyright>
                &copy; CodeSupport {new Date().getFullYear()}
			</Copyright>
		</footer>
	);
}

export default Footer;
