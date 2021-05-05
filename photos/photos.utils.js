export const processHashtags = (caption) => {
    const hashtags = caption.match(/#[\w]+/g) || [];
    console.log(hashtags)
    return hashtags.map(hashtag => ({
        where:{hashtag}, create:{hashtag}
    }))
}