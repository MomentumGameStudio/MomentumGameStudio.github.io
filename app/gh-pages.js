var ghpages = require('gh-pages');

ghpages.publish(
    'app', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/MomentumGameStudio/MomentumGameStudio.github.io.git', // Update to point to your repository  
        user: {
            name: 'Tristan Johnson', // update to use your name
            email: 'x7picturesx@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)