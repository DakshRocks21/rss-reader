

# Written by Daksh

import re

def process_css(css_input):
    # ChatGPT
    rgb_pattern = re.compile(r"rgb\(([\d\s.]+)\)")
    color_pattern = re.compile(r"([\d\.]+)\s+([\d\.]+)\s+([\d\.]+)")
    
    # Step 1: Remove `rgb()` wrapping
    css_no_rgb = rgb_pattern.sub(r"\1", css_input)
    
    # Step 2: Convert decimal values to integers
    def replace_color(match):
        r = int(float(match.group(1)) * 255)
        g = int(float(match.group(2)) * 255)
        b = int(float(match.group(3)) * 255)
        return f"{r} {g} {b}"
    
    converted_css = re.sub(color_pattern, replace_color, css_no_rgb)
    return converted_css

css_variables = open("payload.txt").read()

converted_css = process_css(css_variables)
print(converted_css)
# after i converted it, i copied it to the css file.
