GITHUB LINK : https://github.com/juicebox013/cse134b-hw5
# PART 1
when using the theme picker, if a user has a default browser theme set as 'dark', there may be a slight flash if you change the theme to be 'light' using the picker and refresh the page. this is because when you refresh the page, the page is using the default mode of 'dark' for a slight second before the js runs and changes it back to 'light'.

# Part 2

we should not directly insert data into an innerHTML string because we do not have full control over the API. This is not a secure practice as the api could include or insert something completely different from what we were expecting, like bad html code. 

the web component custom element that i inserted based on the suggestions was a weather card reference using meteo. 
the tag is <weather-card></weather-card> and it supports latitude and longitude attributes and reflects states such as idle, loading, and error. 

# Part 3