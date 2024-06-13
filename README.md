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
1. **Database Creation:**
   My first problem was that there wasn't any database of all the cross-country centers in Quebec. So, my first task was to extract as much information as possible from other websites or blogs and confirm that each center still existed.

   To address this problem, I decided to use Puppeteer for its automation and scraping functionality. I first wrote a script to scrape an existing but very outdated database on the web and check if the web links were still active (i.e., they didn't lead to a dead or 404 page). After that, I needed to get the address, phone number, and email of each center. So, I created a second Puppeteer script to automate a Google search and scrape the data returned by the script.

2. **Snow Condition Scraping:**
   Once my database was validated and imported into MongoDB, I needed to find the snow conditions for each center. Some conditions were on the homepage, while others were on a specific URL on the website. For this part, I decided to divide my task into multiple groups. The first group was to create a function for websites hosted by the same server platform and to create a function for each of them. After that, for the rest that were too different, I did it manually by going through each site and finding the HTML elements to scrape to find the conditions. After that, I could just run my Puppeteer script to scrape all my website-specific HTML elements each day.

3. **Data Standardization:**
   My third big problem was to standardize all the data I scraped from the web because the goal of using a database of conditions was to be faster than visiting the websites directly. To achieve this, I decided to use the OpenAI API to parse my data. I first thought about the questions I wanted to answer in my condition report and the best way to display my
