//Home Page component rendering the Home Page
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typeahead } from "../components/Typeahead";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import homePageBackground from "../images/homePageBackground.jpg";
import { FaSnowflake } from "react-icons/fa";
import { FaSkiingNordic } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";

export const HomePage = () => {
  const navigate = useNavigate();

  const [regions, setRegions] = useState(null);

  useEffect(() => {
    fetch(`/api/allRegions`)
      .then((response) => response.json())
      .then((data) => {
        if ((data.message = "Request sucessfull: ")) {
          setRegions(data.data);
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for all region:`, error);
      });
  }, []);

  const handleChange = (domElement) => {
    const regionSelected = domElement.target.value;
    navigate(`region/${regionSelected}`);
  };

  const Features = [
    {
      icon: <FaSnowflake size={"70%"}></FaSnowflake>,
      title: "50+ centers",
      hook: "check conditions",
    },
    {
      icon: <FaSkiingNordic size={"70%"}></FaSkiingNordic>,
      title: "Fresh track paradise",
      hook: "Experience the last track",
    },
    {
      icon: <FaSearchLocation size={"70%"}></FaSearchLocation>,
      title: "Easy Search",
      hook: "Find easily by region !",
    },
    {
      icon: <MdOutlineUpdate size={"70%"}></MdOutlineUpdate>,
      title: "Update Each day",
      hook: "Follow daily change",
    },
  ];

  return (
    <HomePageStyled>
      <InputAndImageBlock>
        <div className="flex1">
          <p className="brandName">Quebec CrossCountry Finder!</p>
          {/* //todo Add the toggle when sign in/Sin out between log IN and My account */}
          <button>
            <NavLink role="button" to="/login"></NavLink>Log In
          </button>
        </div>
        <div className="flex2">
          <h1>
            Every day snow updates for your favorite cross-country resorts!
          </h1>
          {/* <div className="flex-centers-selection"> */}
          <Typeahead />
          {/* <select onChange={(domElement) => {handleChange(domElement)}}>
        <option value="" disabled selected>Filter by region</option>
        {regions && regions.map(region => 
        <option key={region}>{region}</option>)}
      </select> */}
          {/* </div> */}
        </div>
      </InputAndImageBlock>
      <FeaturesBlock>
        {Features.map((feature)=> <FeatureBlock>
          <div>{feature.icon}</div>
          <h4>{feature.title}</h4>
          <p>{feature.hook}</p>
        </FeatureBlock>)}
      </FeaturesBlock>
      <HowItWorkBlock></HowItWorkBlock>

      {/* <img src="./homePageBanner.jpg"></img>
  <h1>Quebec CrossCountry Finder!</h1>
  <FinderElementContainer>
  <Typeahead/>
  <select onChange={(domElement) => {handleChange(domElement)}}>
  <option>Filter by region</option>
    {regions && regions.map(region => 
    <option key={region}>{region}</option>)}
  </select>
  </FinderElementContainer> */}
    </HomePageStyled>
  );
};

const HomePageStyled = styled.div`
  height: 200vh;
  font-size: 1.2em;
  border: solid pink;
  overflow: hidden;
  display: grid;
  grid-template-rows: 2fr 1.25fr 2fr;

  img {
    width: 99%;
    height: 100%;
    position: absolute;
    top: -0.2%;
    z-index: -1;
    opacity: 80%;
  }
`;
const InputAndImageBlock = styled.div`
  border: solid 2px;
  display: flex;
  flex-direction: column;
  padding: 1em 1em;
  background-image: url("https://media.canva.com/v2/image-resize/format:JPG/height:900/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2Ff_FJQ%2FMAGY3Of_FJQ%2F1%2Fp.jpg/watermark:F/width:1600?csig=AAAAAAAAAAAAAAAAAAAAAN81sTaF1hP8P3oIvHRdoaOUmrtGUzrW5C4klKhgs8cQ&exp=1733822765&osig=AAAAAAAAAAAAAAAAAAAAAGA7Dfsp8461aK7PcpF0N7d1ashjG6ckaSJRItPufWLQ&signer=media-rpc&x-canva-quality=screen_2x");
  background-position: right 100% bottom 40%;
  background-repeat: no-repeat;

  div.flex1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p.brandName {
      display: inline;
      color: white;
      /* margin-left:1em;
      margin-top: 1.5em; */
      font-weight: bold;
      font-style: underline;
    }
  }

  div.flex2 {
    display: flex;
    flex-direction: column;

    h1 {
      color: white;
      text-align: center;
      width: 85%;
      margin: 1em auto 0.5em auto;
      margin-right: 10%;
      font-size: 2.5em;
    }
  }

  div.flex-centers-selection {
    border: solid black;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: none;
    margin: none;
    padding: 0.5em;
  }
`;
const FeaturesBlock = styled.div`
  border: solid 2px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
`;
const FeatureBlock = styled.div`
  display:flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin:auto;
  text-align: center;
  padding:4em 2em;
  width:50%;
  height:25%;
  font-size: 1.2em;

  div{
    width:100%;
    padding:none;
    margin:none;
  }

  h4{
    margin: 0.5em;
    margin-top:0;
    padding-top:0;
  }
  
`;

const HowItWorkBlock = styled.div`
  border: solid 2px;
`;

// const FinderElementContainer = styled.div`
// margin-top:2%;
// margin-right:2%;
// margin-left: 2%;
// display:grid;
// grid-template-columns: 0.75fr 0.25fr;
// height: max-content;
// border-radius:15px;
// border: solid black;
// font-size: 1.5em;
// position: relative;

// select {
//   background-color: rgba(0, 0, 0, 0);
//   border: none;
//   outline: none;
//   margin:0;
//   font-size: 1.2em;
//   position:absolute;
//   right:9%;
//   top:20%
// }

// option{
//   background-color: rgba(0, 0, 0, 0);
//   text-decoration: none;
// }

// `
