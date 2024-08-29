import clipboard

txt = ""

for x in range(10000):
    txt += f'<a href="https://google.com?id={x}" id="{x}" style="display: none;" target="_blank">Click</a>'

clipboard.copy(txt)