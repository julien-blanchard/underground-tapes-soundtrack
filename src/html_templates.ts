export const TAG_STYLE: string = `
    <style>
        .adjust-centre {
            text-align: center;
            margin-left: auto;
            justify-content: flex-end;
        }
    </style>
`;
export const TAG_HEADER: string = `
        <header class="adjust-centre">
            <nav>
                <a href="#">Home</a>
                <a href="#section-about">About</a>
                <a href="#section-faq">FAQ</a>
                <a href="#section-contribute">Contribute</a>
            </nav>
        </header>
`;
export const TAG_MAIN_DIV: string = `
        <div class="adjust-centre">
            <h2><strong>Underground Tapes</strong></h2>
            <p><i>Bodyboarding videos soundtrack</i></p>
        </div>
        <div>
            <section>
                <article>
                    <div>
                    You'll find on this webpage information about the soundtrack for <b>Chris Stroh</b>'s 
                    <i>Underground Tapes</i> bodyboarding videos.
                    </div>
                    <br>
                    <div>
                    Whenever possible, x.
                    </div>
                    
                </article>
            </section>
        </div>
`;
export const TAG_FOOTER: string = `
        <footer>
            <p>&copy; <a href="https://blanchardjulien.com/" target="_blank">Julien B.</a> 2025</p>
        </footer>
`;
export const HTML5_BLUEPRINT: string = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{placeholder_css_cdn}}">
    <title>Underground Tapes bodyboarding videos - Soundtrack</title>
    {{placeholder_tag_style}}
  </head>
  <body>
    <main class="container">
        {{placeholder_tag_header}}
        {{placeholder_tag_main_div}}
        {{placeholder_tables}}
        <section>
        {{placeholder_about}}
        {{placeholder_faq}}
        {{placeholder_contribute}}
        </section>
    </main>
    {{placeholder_footer}}
  </body>
</html>
`
export const HTML_ABOUT: string = `
<h2 id="section-about">About</h2>
<br>
<div>
    <p>Bla bla</p>
</div>
`
export const HTML_FAQ: string = `
<h2 id="section-faq">FAQs</h2>
<br>
<details name="faq1">
  <summary>Why did you create this webpage? Surely you must be looking for money or something.</summary>
  <p>Just like you, I grew up watching these videos over and over again.</p>
  <p>The <b>Discogs</b> and <b>YouTube</b> / <b>Bandcamp</b> / <b>SoundCloud</b> links do not contain any affiliate id or anything of the sort.</p>
</details>
<details name="faq2">
  <summary>This webpage looks dodgy. Why should I trust you?</summary>
  <p>By all means, you should never trust anybody on the internet.</p>
  <p>This is why I have made the source code for this website public. You can find it directly on this <a href="https://github.com/julien-blanchard/underground-tapes-soundtrack" target="_blank">GitHub repository</a></p>
</details>
<details name="faq3">
  <summary>This must be illegal.</summary>
  <p>All that this webpage does is link to a bunch of <b>YouTube</b> videos. Now whether these videos are being legally hosted on <b>YouTube</b> or not, I cannot tell.</p>
</details>
<details name="faq4">
  <summary>How can I save the YouTube or BandCamp songs as mp3 files?</summary>
  <p>Message me 🙂.</p>
</details>
<details name="faq5">
  <summary>Is this AI generated?</summary>
  <p>Nope, I wrote all the code / content for this webpage myself.</p>
</details>
<details name="faq5">
  <summary>This is one of the ugliest webpages that I have ever seen!</summary>
  <p>Thanks!</p>
</details>
`
export const HTML_CONTRIBUTE: string = `
<h2 id="section-contribute">Contribute</h2>
<br>
<div>
    <p>You are more than welcome to contribute to this project! Feel free to help me:</p>
    <ul>
        <li>Identify any missing artist / song.</li>
        <li>Find errors / typos within this webpage.</li>
        <li>
            Improve the source code for this webpage. 
            Currently the songs list sits in a <mark>Markdown</mark> file. 
            I wrote a very primitive parser in <mark>TypeScript</mark> that reads this file and turns it into an <mark>html</mark> page. 
            The overall look and feel of the webpage is handled by <a href="https://simplecss.org/" target="_blank">Simple.css</a>, 
            and the whole thing is hosted on a <mark>Cloudflare</mark> free-tier account.
        </li>
    </ul>
</div>
`