List of weird bugs

In my quest for mobile first web design the chrome dev tools kept scaling everything in the mobile viewer
You must add:
<meta name="viewport" content="width=device-width, initial-scale=1.0">

componentDidUpdate won't get called when you use Two containers for one presentational component. It is mounting a new component not re-rendering the old one even though they both use the same presentational component.

css bugs:

Always test what you are changing. Set the background color and try something out first
I kept trying to change a workspace item but i had mispelled it workplace. 30 minutes wasted.