//Home Page component rendering the Home Page
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typeahead } from "../components/Typeahead";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
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

  const howItWorksSteps = [
    
      {
        image: "https://assets.api.uizard.io/api/cdn/stream/28727295-5ea8-4a46-a6cb-8b59b13afb9c.png&quot",
        title: "Find your perfect spot",
        hook: "Discover the best sow spot near of you",
      },
      {
        image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwyMnx8cmVwb3J0fGVufDF8fHx8MTcxOTk2OTkyMHww&ixlib=rb-4.0.3&q=80&w=1080&quot",
        title: "Check their new conditions",
        hook: "Ezasily view conditions and meteo",
      },
      {
        image: "https://images.unsplash.com/photo-1577138565420-9780b78b0ee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHw3fHxjYWJpbiUyMHNub3d8ZW58MXx8fHwxNzE5OTcwMzk5fDA&ixlib=rb-4.0.3&q=80&w=1080&quot",
        title: "Track your favorite center",
        hook: "Favorite your center",
      },
      {
        image: "https://images.unsplash.com/photo-1486078695445-0497c2f58cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDUzMDJ8MHwxfHNlYXJjaHwxMnx8c25vd3xlbnwxfHx8fDE3MTk5Njk4MDZ8MA&ixlib=rb-4.0.3&q=80&w=1080&quot",
        title: "Enjor the snow !",
        hook: "Share with the community",
      },

    
  ]

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
          <div className="icon">{feature.icon}</div>
          <h4>{feature.title}</h4>
          <p>{feature.hook}</p>
        </FeatureBlock>)}
      </FeaturesBlock>
      
      
      <HowItWorkBlock>
      <h3>How it works?</h3>
        {howItWorksSteps.map((step, index) => 
        <Step>
        <ImgStep bgimage={step.image}>
        </ImgStep>
        <div className="textDiv">
        <h3>{index}</h3>
        <h4>{step.title}</h4>
        <p>{step.hook}</p>
        </div>        
        
        </Step>
        )}
        
      </HowItWorkBlock>

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
  font-size: 1em;
  overflow: hidden;
  display: grid;
  grid-template-rows: 3fr 1fr 3fr;
  border:solid green 4px;
  grid-gap: 1em;

  /* img {
    width: 99%;
    height: 100%;
    position: absolute;
    top: -0.2%;
    z-index: -1;
    opacity: 80%;
  } */
`;
const InputAndImageBlock = styled.div`
  /* border:solid pink 4px; */
  display: flex;
  flex-direction: column;
  padding: 1em 1em;
  background-image: url("https://media.canva.com/v2/image-resize/format:JPG/height:900/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2Ff_FJQ%2FMAGY3Of_FJQ%2F1%2Fp.jpg/watermark:F/width:1600?csig=AAAAAAAAAAAAAAAAAAAAAN81sTaF1hP8P3oIvHRdoaOUmrtGUzrW5C4klKhgs8cQ&exp=1733822765&osig=AAAAAAAAAAAAAAAAAAAAAGA7Dfsp8461aK7PcpF0N7d1ashjG6ckaSJRItPufWLQ&signer=media-rpc&x-canva-quality=screen_2x");
  background-position: right 100% bottom 45%;
  /* width:125%; */
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
    flex-wrap: wrap;
    width:max-content;
    text-align: center;

    h1 {
      color: white;
      text-align: center;
      width: 80%;
      margin: 1em auto 0.5em auto;
      margin-right: 30%;
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
  /* border:Solid yellow 8px; */
  background-color: var(--box-bg-color);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  width:95%;
  padding:0.5em;
  margin:auto;
  border-radius: 15px;
`;
const FeatureBlock = styled.div`
  display:flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin:auto;
  text-align: center;
  padding:1em 2em;
  width:75%;
  height:0.5%;
  /* font-size: 1em; */

  div{
    width:100%;
    padding:none;
    margin:none;
  }

  .icon {
    width:25%;
    margin:auto;
  }

  h4{
    margin: 0.5em;
    margin-top:0;
    padding-top:0;
  }
  
`;

const HowItWorkBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: 1fr;
  /* border:solid 4px blue; */
  position:relative;

  h3 {
    position:absolute;
    text-align: left;
    margin-left:1em;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  margin-top:2em;

  .textDiv{
    width:85%;
    margin: 0 auto;
  }

  h3{
    margin: 0;
  }

  p{
    margin: 0.25em;
  }
`

const ImgStep = styled.div`
  margin:auto;
  border-radius: 15px;
  text-align: center;
  padding:4em 2em;
  width:65%;
  height:20%;
  font-size: 1.2em;
  margin:1em;
  background-image: url(${(props) => props.bgimage});
  background-size: cover;
  display: block;
  margin:1em;
`

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
