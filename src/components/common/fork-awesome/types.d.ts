/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export type IconName = '500px'|'activitypub'|'address-book-o'|'address-book'|'address-card-o'|'address-card'|'adjust'|'adn'|'align-center'|'align-justify'|'align-left'|'align-right'|'amazon'|'ambulance'|'american-sign-language-interpreting'|'anchor'|'android'|'angellist'|'angle-double-down'|'angle-double-left'|'angle-double-right'|'angle-double-up'|'angle-down'|'angle-left'|'angle-right'|'angle-up'|'apple'|'archive-org'|'archive'|'archlinux'|'area-chart'|'arrow-circle-down'|'arrow-circle-left'|'arrow-circle-o-down'|'arrow-circle-o-left'|'arrow-circle-o-right'|'arrow-circle-o-up'|'arrow-circle-right'|'arrow-circle-up'|'arrow-down'|'arrow-left'|'arrow-right'|'arrows-alt'|'arrows-h'|'arrows'|'arrows-v'|'arrow-up'|'artstation'|'assistive-listening-systems'|'asterisk'|'at'|'att'|'audio-description'|'backward'|'balance-scale'|'bandcamp'|'ban'|'bar-chart'|'barcode'|'bars'|'bath'|'battery-empty'|'battery-full'|'battery-half'|'battery-quarter'|'battery-three-quarters'|'bed'|'beer'|'behance-square'|'behance'|'bell-o'|'bell-rigning-o'|'bell-ringing'|'bell-slash-o'|'bell-slash'|'bell'|'bicycle'|'binoculars'|'biometric'|'birthday-cake'|'bitbucket-square'|'bitbucket'|'black-tie'|'blind'|'bluetooth-b'|'bluetooth'|'bold'|'bolt'|'bomb'|'bookmark-o'|'bookmark'|'book'|'bootstrap'|'braille'|'briefcase'|'btc'|'bug'|'building-o'|'building'|'bullhorn'|'bullseye'|'bus'|'buysellads'|'calculator'|'calendar-check-o'|'calendar-minus-o'|'calendar-o'|'calendar-plus-o'|'calendar'|'calendar-times-o'|'camera-retro'|'camera'|'caret-down'|'caret-left'|'caret-right'|'caret-square-o-down'|'caret-square-o-left'|'caret-square-o-right'|'caret-square-o-up'|'caret-up'|'car'|'cart-arrow-down'|'cart-plus'|'cc-amex'|'cc-diners-club'|'cc-discover'|'cc-jcb'|'cc-mastercard'|'cc-paypal'|'cc-stripe'|'cc'|'cc-visa'|'certificate'|'chain-broken'|'check-circle-o'|'check-circle'|'check-square-o'|'check-square'|'check'|'chevron-circle-down'|'chevron-circle-left'|'chevron-circle-right'|'chevron-circle-up'|'chevron-down'|'chevron-left'|'chevron-right'|'chevron-up'|'child'|'chrome'|'circle-o-notch'|'circle-o'|'circle'|'circle-thin'|'classicpress-circle'|'classicpress'|'clipboard'|'clock-o'|'clone'|'cloud-download'|'cloud'|'cloud-upload'|'code-fork'|'codepen'|'code'|'codiepie'|'coffee'|'cogs'|'cog'|'columns'|'commenting-o'|'commenting'|'comment-o'|'comments-o'|'comments'|'comment'|'compass'|'compress'|'connectdevelop'|'contao'|'copyright'|'creative-commons'|'credit-card-alt'|'credit-card'|'crop'|'crosshairs'|'css3'|'c'|'cubes'|'cube'|'cutlery'|'dashcube'|'database'|'deaf'|'debian'|'delicious'|'desktop'|'deviantart'|'dev-to'|'diamond'|'diaspora'|'digg'|'digitalocean'|'discord-alt'|'discord'|'dogmazic'|'dot-circle-o'|'download'|'dribbble'|'dropbox'|'drupal'|'edge'|'eercast'|'eject'|'ellipsis-h'|'ellipsis-v'|'emby'|'empire'|'envelope-open-o'|'envelope-open'|'envelope-o'|'envelope-square'|'envelope'|'envira'|'eraser'|'ethereum'|'etsy'|'eur'|'exchange'|'exclamation-circle'|'exclamation'|'exclamation-triangle'|'expand'|'expeditedssl'|'external-link-square'|'external-link'|'eyedropper'|'eye-slash'|'eye'|'facebook-messenger'|'facebook-official'|'facebook-square'|'facebook'|'fast-backward'|'fast-forward'|'fax'|'f-droid'|'female'|'ffmpeg'|'fighter-jet'|'file-archive-o'|'file-audio-o'|'file-code-o'|'file-epub'|'file-excel-o'|'file-image-o'|'file-o'|'file-pdf-o'|'file-powerpoint-o'|'files-o'|'file'|'file-text-o'|'file-text'|'file-video-o'|'file-word-o'|'film'|'filter'|'fire-extinguisher'|'firefox'|'fire'|'first-order'|'flag-checkered'|'flag-o'|'flag'|'flask'|'flickr'|'floppy-o'|'folder-open-o'|'folder-open'|'folder-o'|'folder'|'font-awesome'|'fonticons'|'font'|'fork-awesome'|'fort-awesome'|'forumbee'|'forward'|'foursquare'|'free-code-camp'|'freedombox'|'friendica'|'frown-o'|'funkwhale'|'futbol-o'|'gamepad'|'gavel'|'gbp'|'genderless'|'get-pocket'|'gg-circle'|'gg'|'gift'|'gimp'|'gitea'|'github-alt'|'github-square'|'github'|'gitlab'|'git-square'|'git'|'glass'|'glide-g'|'glide'|'globe-e'|'globe'|'globe-w'|'gnupg'|'gnu-social'|'google-plus-official'|'google-plus-square'|'google-plus'|'google'|'google-wallet'|'graduation-cap'|'gratipay'|'grav'|'hackaday'|'hacker-news'|'hackster'|'hal'|'hand-lizard-o'|'hand-o-down'|'hand-o-left'|'hand-o-right'|'hand-o-up'|'hand-paper-o'|'hand-peace-o'|'hand-pointer-o'|'hand-rock-o'|'hand-scissors-o'|'handshake-o'|'hand-spock-o'|'hashnode'|'hashtag'|'hdd-o'|'header'|'headphones'|'heartbeat'|'heart-o'|'heart'|'history'|'home'|'hospital-o'|'hourglass-end'|'hourglass-half'|'hourglass-o'|'hourglass-start'|'hourglass'|'houzz'|'h-square'|'html5'|'hubzilla'|'i-cursor'|'id-badge'|'id-card-o'|'id-card'|'ils'|'imdb'|'inbox'|'indent'|'industry'|'info-circle'|'info'|'inkscape'|'inr'|'instagram'|'internet-explorer'|'ioxhost'|'italic'|'jirafeau'|'joomla'|'joplin'|'jpy'|'jsfiddle'|'julia'|'jupyter'|'keybase'|'keyboard-o'|'key-modern'|'key'|'krw'|'language'|'laptop'|'laravel'|'lastfm-square'|'lastfm'|'leaf'|'leanpub'|'lemon-o'|'level-down'|'level-up'|'liberapay-square'|'liberapay'|'life-ring'|'lightbulb-o'|'line-chart'|'linkedin-square'|'linkedin'|'link'|'linode'|'linux'|'list-alt'|'list-ol'|'list'|'list-ul'|'location-arrow'|'lock'|'long-arrow-down'|'long-arrow-left'|'long-arrow-right'|'long-arrow-up'|'low-vision'|'magic'|'magnet'|'male'|'map-marker'|'map-o'|'map-pin'|'map-signs'|'map'|'mars-double'|'mars-stroke-h'|'mars-stroke'|'mars-stroke-v'|'mars'|'mastodon-alt'|'mastodon-square'|'mastodon'|'matrix-org'|'maxcdn'|'meanpath'|'medium-square'|'medium'|'medkit'|'meetup'|'meh-o'|'mercury'|'microchip'|'microphone-slash'|'microphone'|'minus-circle'|'minus-square-o'|'minus-square'|'minus'|'mixcloud'|'mobile'|'modx'|'money'|'moon-o'|'moon'|'motorcycle'|'mouse-pointer'|'music'|'neuter'|'newspaper-o'|'nextcloud-square'|'nextcloud'|'nodejs'|'object-group'|'object-ungroup'|'odnoklassniki-square'|'odnoklassniki'|'opencart'|'open-collective'|'openid'|'opera'|'optin-monster'|'orcid'|'outdent'|'pagelines'|'paint-brush'|'paperclip'|'paper-plane-o'|'paper-plane'|'paragraph'|'patreon'|'pause-circle-o'|'pause-circle'|'pause'|'paw'|'paypal'|'peertube'|'pencil-square-o'|'pencil-square'|'pencil'|'percent'|'phone-square'|'phone'|'php'|'picture-o'|'pie-chart'|'pinterest-p'|'pinterest-square'|'pinterest'|'pixelfed'|'plane'|'play-circle-o'|'play-circle'|'play'|'pleroma'|'plug'|'plus-circle'|'plus-square-o'|'plus-square'|'plus'|'podcast'|'power-off'|'print'|'product-hunt'|'puzzle-piece'|'python'|'qq'|'qrcode'|'question-circle-o'|'question-circle'|'question'|'quora'|'quote-left'|'quote-right'|'random'|'ravelry'|'react'|'rebel'|'recycle'|'reddit-alien'|'reddit-square'|'reddit'|'refresh'|'registered'|'renren'|'repeat'|'reply-all'|'reply'|'researchgate'|'retweet'|'road'|'rocket'|'rss-square'|'rss'|'rub'|'safari'|'scissors'|'scribd'|'scuttlebutt'|'search-minus'|'search-plus'|'search'|'sellsy'|'server'|'shaarli-o'|'shaarli'|'share-alt-square'|'share-alt'|'share-square-o'|'share-square'|'share'|'shield'|'ship'|'shirtsinbulk'|'shopping-bag'|'shopping-basket'|'shopping-cart'|'shower'|'signalapp'|'signal'|'sign-in'|'sign-language'|'sign-out'|'simplybuilt'|'sitemap'|'skyatlas'|'skype'|'slack'|'sliders'|'slideshare'|'smile-o'|'snapchat-ghost'|'snapchat-square'|'snapchat'|'snowdrift'|'snowflake-o'|'social-home'|'sort-alpha-asc'|'sort-alpha-desc'|'sort-amount-asc'|'sort-amount-desc'|'sort-asc'|'sort-desc'|'sort-numeric-asc'|'sort-numeric-desc'|'sort'|'soundcloud'|'space-shuttle'|'spell-check'|'spinner'|'spoon'|'spotify'|'square-o'|'square'|'stack-exchange'|'stack-overflow'|'star-half-o'|'star-half'|'star-o'|'star'|'steam-square'|'steam'|'step-backward'|'step-forward'|'stethoscope'|'sticky-note-o'|'sticky-note'|'stop-circle-o'|'stop-circle'|'stop'|'street-view'|'strikethrough'|'stumbleupon-circle'|'stumbleupon'|'subscript'|'subway'|'suitcase'|'sun-o'|'sun'|'superpowers'|'superscript'|'syncthing'|'table'|'tablet'|'tachometer'|'tags'|'tag'|'tasks'|'taxi'|'telegram'|'television'|'tencent-weibo'|'terminal'|'text-height'|'text-width'|'themeisle'|'thermometer-empty'|'thermometer-full'|'thermometer-half'|'thermometer-quarter'|'thermometer-three-quarters'|'th-large'|'th-list'|'th'|'thumbs-down'|'thumbs-o-down'|'thumbs-o-up'|'thumbs-up'|'thumb-tack'|'ticket'|'times-circle-o'|'times-circle'|'times'|'tint'|'tipeee'|'toggle-off'|'toggle-on'|'tor-onion'|'trademark'|'train'|'transgender-alt'|'transgender'|'trash-o'|'trash'|'tree'|'trello'|'tripadvisor'|'trophy'|'truck'|'try'|'tty'|'tumblr-square'|'tumblr'|'twitch'|'twitter-square'|'twitter'|'umbrella'|'underline'|'undo'|'universal-access'|'university'|'unlock-alt'|'unlock'|'unslpash'|'upload'|'usb'|'usd'|'user-circle-o'|'user-circle'|'user-md'|'user-o'|'user-plus'|'user-secret'|'users'|'user'|'user-times'|'venus-double'|'venus-mars'|'venus'|'viacoin'|'viadeo-square'|'viadeo'|'video-camera'|'vimeo-square'|'vimeo'|'vine'|'vk'|'volume-control-phone'|'volume-down'|'volume-mute'|'volume-off'|'volume-up'|'weibo'|'weixin'|'whatsapp'|'wheelchair-alt'|'wheelchair'|'wifi'|'wikidata'|'wikipedia-w'|'window-close-o'|'window-close'|'window-maximize'|'window-minimize'|'window-restore'|'windows'|'wire'|'wordpress'|'wpbeginner'|'wpexplorer'|'wpforms'|'wrench'|'xing-square'|'xing'|'xmpp'|'yahoo'|'y-combinator'|'yelp'|'yoast'|'youtube-play'|'youtube-square'|'youtube'|'zotero'
export type IconSize = '2x'|'3x'|'4x'|'5x'
