import React from 'react';

function NewsItem({item}) {
    const websiteUrl = item.source.url;
    const websites = websiteUrl.split('https://').pop().split('/')[0];

    const date = item.publishedAt;
    const formatDate = date.replace('T', ' ');
    const formatTime = formatDate.replace('Z', '');

    // Fallback image URL
    const fallbackImageUrl = 'https://via.placeholder.com/400x200?text=No+Image+Available';

    return (
        <a href={item.url} className="article">
            <div className="article-image">
                <img 
                    src={item.image || fallbackImageUrl} 
                    alt={item.title}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImageUrl;
                    }}
                />
            </div>
            
            <div className="article-content">
                <div className="article-source">
                    <img 
                        src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${websites}&size=16`} 
                        alt={item.source.name || "source icon"}
                    />
                    <span>{item.source.name}</span>
                </div>

                <div className="article-title">
                    <h2>{item.title}</h2>
                </div>
                <p className="article-description">
                    {item.description}
                </p>
                <div className="article-details">
                    <small><b>Published At: </b>{formatTime}</small>
                </div>
            </div>
        </a>
    )
}

export default NewsItem;
