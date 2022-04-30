List of weird bugs

In my quest for mobile first web design the chrome dev tools kept scaling everything in the mobile viewer
You must add:
<meta name="viewport" content="width=device-width, initial-scale=1.0">

componentDidUpdate won't get called when you use Two containers for one presentational component. It is mounting a new component not re-rendering the old one even though they both use the same presentational component.

css bugs:

Always test what you are changing. Set the background color and try something out first
I kept trying to change a workspace item but i had mispelled it workplace. 30 minutes wasted.

There's so much new css I've learned and it's hard to remember it all:

Add text-overflow: ellipsis to add ellipsis when an element is too small but you must add overflow:hidden and white-space:nowrap are set
if it's inside of a flexbox you must set the min-width: 0;

clip-path is interesting
don't forget to add px or you get bugs.


notes:

rems > pixels whenever possible
ems are good for consistent padding
NavLinks > Links if you need to pass class data
withRouter is great to pass history info

Creating a separate function inside a class to render conditionally works great but it doesn't work if you do a if assignment in the render. It doesn't break but it doesn't render correctly

when you scale an image with transform it ignores overflow. webkit bug.
