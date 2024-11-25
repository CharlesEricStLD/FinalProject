# Cross Country Finder

**5 min**

This full-stack website is devoted to finding and presenting the current snow conditions for all cross-country ski centers in Quebec, ensuring users have quick access to the latest updates.

## Type
Outdoor utility platform

## Stack
- JavaScript
- React
- Vite
- NodeJS
- MongoDB
- OpenAi API
- Puppeteer

![Screenshot of the Home page of the app](path-to-screenshot.png)

## Project Purpose and Goal

In Quebec, cross-country centers are typically managed by private operators, each maintaining their own website and presenting snow conditions in varying formats. This fragmentation means that to check conditions across multiple centers, users must tediously search and navigate each website individually. The aim of this project is to address this issue by creating a centralized database for up-to-date snow conditions in all Quebec cross-country centers. Our platform offers users a streamlined experience, allowing them to easily find the latest conditions for their favorite centers, log in to their profile, and create favorites.

## Web Stack and Explanation

The stack for this project is JavaScript-based. For the front end, I chose React with Vite for its fast build times and efficient development experience. On the back end, I used Node.js due to my familiarity with it and its robust performance. To gather the necessary data from various websites, I implemented automation with Puppeteer, a powerful JavaScript tool for web scraping and automating web-based tasks. Finally, I selected MongoDB for the database to effectively manage and store the collected snow condition data and center information. To parse the conditions into a uniform format, I decided to leverage AI. Given my familiarity with the ChatGPT prompt style, I opted to use the OpenAI API for this purpose.

## Problems and Thought Process

My first challenge was the lack of a comprehensive database for cross-country centers in Quebec. To resolve this, I used Puppeteer to scrape outdated online databases, checking link validity and collecting basic center information such as addresses and contact details.

For retrieving snow conditions, I employed Puppeteer again. I wrote scripts to extract data from websites with similar structures and manually identified HTML elements for more complex sites. These scripts ran daily to keep the data up-to-date.

Standardizing the data was another hurdle. I utilized the OpenAI API to parse and format the information, focusing on key details like operational status, closed tracks, snow conditions, and update dates. The API responses were standardized in JSON format, ensuring consistency and clarity.

This approach effectively addressed the data collection and standardization challenges, resulting in a reliable and organized database.

## Lessons Learned & Future Work

This project was substantial but highly engaging. I gained extensive knowledge about Puppeteer, automation, and web scraping. I've realized that some tasks, such as checking ski conditions at various cross-country centers, are better done manually, while others can be swiftly automated when website structures are consistent. Additionally, having never used the OpenAI API before, I learned about prompt structuring, various formulation techniques, and parameters like temperature to control response variability. This allowed me to leverage AI with greater precision for parsing large and diverse datasets.
```

Feel free to adjust any links or image paths as needed!
