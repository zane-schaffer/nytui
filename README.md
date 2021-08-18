# nytui
a simple way to digest all of the New York Time's content using their lovely and well documented API.

[![asciicast](https://asciinema.org/a/bEDJaXv8mlVOZlUtu7UQ478Xl.svg)](https://asciinema.org/a/bEDJaXv8mlVOZlUtu7UQ478Xl)

-----
## API key

follow instructions from [NYT](https://developer.nytimes.com/get-started)

## setup

create 'nytui.json' in your `$XDG_CONFIG_HOME` as follows

```json
{
    "API_KEY": "YOUR_API_KEY"
}
```

## running nytui

```bash
git clone https://github.com/zane-schaffer/nytui.git
cd nytui
./cli.js
```

Use the bottom bar to select subject

| Key     | Command                 |
| ------- | ----------------------- |
| up/down | navigation              |
| enter   | open article in browser |
| q       | quit                    |

