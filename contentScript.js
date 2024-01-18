function createCheckbox() {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.position = 'fixed';
    checkboxContainer.style.top = '10px';
    checkboxContainer.style.left = '10px';
    checkboxContainer.style.zIndex = '1000';
    checkboxContainer.style.backgroundColor = '#f0f0f0';
    checkboxContainer.style.border = '1px solid #d0d0d0';
    checkboxContainer.style.borderRadius = '5px';
    checkboxContainer.style.padding = '5px';
    checkboxContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    checkboxContainer.style.display = 'flex';
    checkboxContainer.style.alignItems = 'center';
    checkboxContainer.style.justifyContent = 'center'; // 中央揃えに設定
    checkboxContainer.style.width = '30px'; // 幅を設定
    checkboxContainer.style.height = '30px'; // 高さを設定

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'extensionToggle';
    checkbox.checked = true; // 初期状態を有効に設定

    checkboxContainer.appendChild(checkbox);

    document.body.appendChild(checkboxContainer);

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            hideTextTweets();
        } else {
            showAllTweets();
        }
    });
}


function hideTextTweets() {
    const tweets = document.querySelectorAll('article');

    // 各ツイートに対して、画像URLが含まれているかどうかをチェック
    tweets.forEach(tweet => {
        if (tweet.innerHTML.includes('https://pbs.twimg.com/media/')) {
            tweet.style.display = ''; // 画像URLを含むツイートを表示
            const textContent = tweet.querySelector('[lang]');
            if (textContent) {
                textContent.style.display = 'none'; // テキストコンテンツを非表示にする
            }
        } else {
            tweet.style.display = 'none'; // それ以外のツイートを非表示
        }
    });
}


function showAllTweets() {
    const tweets = document.querySelectorAll('article');

    tweets.forEach(tweet => {
        tweet.style.display = '';
        const textContent = tweet.querySelector('[lang]');
        if (textContent) {
            textContent.style.display = '';
        }
    });
}

// Twitterのタイムラインの変更を監視
const observer = new MutationObserver(function(mutations) {
    const checkbox = document.getElementById('extensionToggle');
    if (checkbox && checkbox.checked) {
        hideTextTweets();
    }
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});

createCheckbox();
hideTextTweets();
