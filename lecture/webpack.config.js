const path = require('path'); //node에소 path를 가져오고

module.exports = {
    name: 'word-replay-setting',
    mode: 'development', // 실서비스는 production, 개발 모드는 development
    devtool : 'eval', // 속도 빠르게
    resolve: {
        extensions: ['.js', '.jsx'], //확장자 찾아서 확장자 붙여준다.
    },

    // 중요한 두가지
    entry : { //입력
        app: ['./client'], //client.jsx에서 WordReplay.jsx를 불러오고 있기때문에 따로 적어주지 않아도 된다. 웹팩이 알아서 다 파악한다
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                //바벨에 대한 설정
                presets: ['@babel/preset-env', '@babel/preset-react'],
                //presets만 일단 설치해보고 에러가 뜬다면 에러뜨는걸 추가로 깔아주는 게 좋다
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        }],
    },

    output: { //출력
        path: path.join(__dirname, 'dist'), //__dirname : 현재폴더, 즉 현재 폴더에 있는 dist
        ///Users/haerim/haerim/workspace/react/web_game 라는 경로를 일일이 입력해주긴 귀찮으니 path를 사용하는 것이다.
        filename: 'app.js'
    },
};