(async()=>{
    await import('https://rpgen3.github.io/lib/lib/jquery-3.5.1.min.js');
    const rpgen3 = await Promise.all([
        'baseN',
        'css',
        'hankaku',
        'random',
        'save',
        'url',
        'util',
        'strToImg'
    ].map(v=>import(`https://rpgen3.github.io/mylib/export/${v}.mjs`))).then(v=>Object.assign({},...v));
    const h = $("<div>").appendTo($("body")).css({
        "text-align": "center",
        padding: "1em"
    });
    $("<h1>").appendTo(h).text("ノイズキャンセラ");
    $("<button>").appendTo(h).text("逆位相発生").on("click",async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true }),
              ctx = new AudioContext(),
              input = ctx.createMediaStreamSource(stream),
              analyzer = ctx.createAnalyser(),
              bufferLength = 2048;
        analyzer.fftSize = bufferLength;
        const dataArray = new Uint8Array(bufferLength);
        input.connect(analyzer);
        setInterval(()=>{
            analyzer.getByteFrequencyData(dataArray);
            for(let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
            }
            //play(ctx.decodeAudioData(dataArray));
        });
    });
    const play = (()=>{
        const ctx = new AudioContext(),
              src = ctx.createBufferSource();
        src.connect(ctx.destination);
        return audioBuffer => {
            src.buffer = audioBuffer;
            src.start();
        };
    })();
})();
