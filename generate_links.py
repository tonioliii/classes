import clipboard

txt = "<div id='links'>"

for x in range(10000):
    txt += f'<a href="https://tonioliii.github.io/classes?id={x}" id="{x}" style="display: none;" target="_blank">Click</a>'

txt += "</div>"

clipboard.copy(txt)