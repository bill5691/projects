# William Skiles - Indeed.com Job Web Scraper
# Indeed_Scraper.py
#
# Python 3.7
# This program acts as an interface where the user can enter criteria for an Indeed.com job search query. The results display
# relevant information such as job title, company, location, and URL in a text document. The user enters a job title, location,
# and directory for the text file to be written.
#
# Requires wxPython GUI toolkit, BeautifulSoup, and requests libraries
#    py -m pip install wxPython==4.0.3 requests BeautifulSoup4

import subprocess
import wx
import requests
from bs4 import BeautifulSoup

# Job constructor
class job:
    def __init__(self, title):
        self.title = title
        self.company = ""
        self.location = ""
        self.url = ""

# Create GUI frame
class ScraperFrame(wx.Frame):

    # Initiate frame properties
    def __init__(self, parent, title):
        super(ScraperFrame, self).__init__(parent, title=title, size=(290, 320))
        self.InitUI()

    # Create frame properties and button event handler
    def InitUI(self):
        panel = wx.Panel(self)
        title = wx.StaticText(panel, label="Indeed Job Web Scraper", pos=(10, 5))
        font = title.GetFont()
        font.PointSize += 5
        font = font.Bold()
        title.SetFont(font)

        self.job_input = wx.TextCtrl(panel, pos=(10, 45))
        self.job_input.SetSize(250, -1)
        self.instruction1 = wx.StaticText(panel, label="Enter a job title", pos=(10, 75))
        self.location_input = wx.TextCtrl(panel, pos=(10, 105))
        self.location_input.SetSize(250, -1)
        self.instruction2 = wx.StaticText(panel, label="Enter a location", pos=(10, 135))
        self.output_dir = wx.TextCtrl(panel, pos=(10, 165))
        self.output_dir.SetSize(250, -1)
        self.instruction3 = wx.StaticText(panel, label="Enter output directory for results file", pos=(10, 195))
        self.search_button = wx.Button(panel, -1, "Search", pos=(90, 225))
        self.search_button.Bind(wx.EVT_BUTTON, self.get_input)

        self.Centre()
        self.statusbar = self.CreateStatusBar()

    # Gets user input from TextCtrl fields
    def get_input(self, event):
        job_title = self.job_input.GetValue()
        location = self.location_input.GetValue()
        output = self.output_dir.GetValue()

        # Error handling for empty fields
        if job_title == "":
            self.statusbar.SetStatusText('Error: No job title entered')
        elif location == "":
            self.statusbar.SetStatusText('Error: No location entered')
        elif output == "":
            self.statusbar.SetStatusText('Error: No output directory entered')
        else:
            self.compile_jobs(job_title, location, output)

    # Compile a list of jobs from the search results on Indeed.com and
    # write the results to a file in the specified directory
    def compile_jobs(self, title, loc, directory):

        # Create a link using user input as an Indeed.com PHP query
        indeed_url = "https://www.indeed.com/jobs?q=" + title + "&l=" + loc
        indeed_url = indeed_url.replace(',', '')

        # Check if URL is available
        web_page = requests.get(indeed_url)

        if web_page.status_code != 200:
            self.statusbar.SetStatusText('Couldn\'t find webpage')
        else:
            # Parse through HTML with BeautifulSoup
            soup = BeautifulSoup(web_page.content, 'html.parser')

            # Create an array to store job objects
            jobs = {}
            i = 0

            # Append file name to specified directory
            filepath = directory + "\\job_results.txt"

            # Try to open or create a file in the specified directory
            try:
                # Open the file for writing; creates the file if it doesn't already exist
                f = open(filepath, "w")

                # Find all job titles under 'a' tag with 'data-tn-element="jobTitle"' attribute
                for item in list(soup.find_all('a', {"data-tn-element" : "jobTitle"})):
                    # Create a job object for each job title found and strip whitespace
                    jobs[i] = job(item.text.strip())
                    i = i + 1
                i = 0

                # Find all company names under each 'span' tag with 'class="company"' attribute
                for company in list(soup.find_all('span', {"class" : "company"})):
                    # Set each job object's company value
                    jobs[i].company = company.text.strip()
                    i = i + 1
                i = 0

                # Find all locations under each 'div' and 'span' tag with 'class="location"' attribute
                for location in list(soup.find_all(['div', 'span'], {"class" : "location"})):
                    # Set each job object's location value
                    jobs[i].location = location.text.strip()
                    i = i + 1
                i = 0

                # Find all job links under each 'a' tag with 'data-tn-element="jobTitle"' attribute
                for link in list(soup.find_all('a', {"data-tn-element" : "jobTitle"})):
                    # Set each job object's url value
                    jobs[i].url = "https://www.indeed.com" + link.get('href').strip()
                    i = i + 1

                # Write each job's title, company, location, and link to the results file
                for _ in jobs:
                    f.write(jobs[_].title.strip() + "\n" + jobs[_].company.strip() + "\n" + jobs[_].location + "\n" + jobs[_].url + "\n\n")

                self.statusbar.SetStatusText('Success: File created!')
                f.close()

                # Opens the job_results.txt document to view (Windows only?)
                subprocess.call(('start', filepath), shell=True)

            except IOError:
                self.statusbar.SetStatusText('Error: Filepath not found')

    def OnExit(self, event):
        self.Close(True)

# Main
if __name__ == '__main__':
    # Create and show application frame
    app = wx.App()
    frame = ScraperFrame(None, title='Indeed Job Web Scraper')
    frame.Show()
    app.MainLoop()
