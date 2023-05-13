# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


Assumptions:
    - an agent only works for a facilities
    - handling the database with migration systems like rails
    - development, test, and production environment


### Ticket #1 - Create a new column "slug" on the Agent table (2 hours)
Create a new migration to add a column named "slug" on the Agent table.
It must be unique, string, max length 256.
The default must be the id plus the formatted name, for example: "25--John-Doe"


### Ticket #2 - Update agent endpoint to accept slug (3 hours)
the agent endpoint must return the new field "slug", and accept it on create and update.
validate for availability (if is unique), and max length 256.
if empty, create a new one based on the id and the formatted name, for example: "25--John-Doe"
Create tests for it.


### Ticket #3 - Add new field "slug" to agent edit and create pages (2 hours)
Create a new field "slug" to the agent edit page, and agent create page.
It must be a string.
It must validate a max length of 256.
it is not required
Create tests for it.


### Ticket #4 - Update generateReport to use slug instead id (2 hours)
Update the generateReport to use agent slug instead agent id
validate the PDF layout with the change and max size 256.
validate with a string using wide char if not a monospaced font, for example: "m" instead of "i".

### Ticket #5 - Deploy to production (2 hours)
Run tests.
deploy to test env and validate it manually (up to pdf generation)
merge branch.
deploy to production.
