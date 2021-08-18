# nytui
a simple way to digest all of the New York Time's content using their lovely and well documented API.

<p align="center">
  <img src="https://github.com/zane-schaffer/nytui/blob/3c9d49e078d66cd41de4e971f69490f7040bd2aa/nytuicast.svg?sanitize=true" width="1000" alt="newsletter cli demo">
</p>

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

