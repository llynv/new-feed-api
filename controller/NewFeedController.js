const Feeds = require('../model/NewFeeds')

const feedPattern = "feedId title content imgs";

const getAllFeeds = async (req, res) => {
    const userId = req.cookies['userId']
    const all_feeds = await Feeds.find({userId: userId}, feedPattern).exec()
    if (all_feeds.length == 0) {
        return res.status(404).json({ message: 'No feeds found' })
    }
    res.send(all_feeds)
}

const getFeedById = async (req, res) => {
    const { feedId } = req.params
    const userId = req.cookies['userId']
    const feedId_userId = `${userId}_${feedId}`
    const feed = await Feeds.findOne({ feedId_userId: feedId_userId }, feedPattern).exec()
    if (feed == null) {
        return res.status(404).json({ message: 'Feed not found' })
    }
    res.send(feed)
}

const createFeed = async (req, res) => {
    const req_feed = req.body
    console.log(req.cookies['userId']);
    const new_feed = {
        ...req_feed,
        userId: req.cookies['userId'],
        feedId_userId: `${req.cookies['userId']}_${req_feed.feedId}`,
        created_at: new Date()
    }
    const findInDb = await Feeds.findOne({ feedId_userId: `${req.cookies['userId']}_${req_feed.feedId}` }).exec()
    if (findInDb) {
        res.status(400).json({ message: 'Feed already exists' })
        return
    }
    await Feeds.create(new_feed)
    res.status(200).json({ message: 'Feed created' })
}

const updateFeed = async (req, res) => {
    const { feedId } = req.params
    const req_feed = req.body
    const userId = req.cookies['userId']
    const feedId_userId = `${userId}_${feedId}`

    if (req_feed._id != null) {
        res.status(400).json({ message: 'Cannot update id' })
        return
    }

    const findInDb = await Feeds.findOne({ feedId_userId: feedId_userId }).exec()
    if (findInDb == null) {
        res.status(404).json({ message: 'Feed not found' })
        return
    }
    const updated_feed = {
        ...req_feed,
        created_at: findInDb.created_at
    }
    await Feeds.updateOne({ feedId_userId: feedId_userId }, { $set: updated_feed }).exec()
    res.status(200).json({ message: 'Feed updated' })
}

const deleteFeed = async (req, res) => {
    const { feedId } = req.params
    const req_feed = req.body
    const userId = req.cookies['userId']
    const feedId_userId = `${userId}_${feedId}`

    const findInDb = await Feeds.findOne({ feedId_userId: feedId_userId }).exec()
    if (findInDb == null) {
        res.status(404).json({ message: 'Feed not found' })
        return
    }
    await Feeds.deleteOne({ feedId_userId: feedId_userId })
    res.status(200).json({ message: 'Feed deleted' })
}

module.exports = {
    getAllFeeds,
    getFeedById,
    createFeed,
    updateFeed,
    deleteFeed
}