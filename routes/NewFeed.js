const express = require('express')
const router = express.Router()
const controller = require('../controller/newFeedController')

router.get('/', controller.getAllFeeds)
router.get('/:feedId', controller.getFeedById)
router.post('/', controller.createFeed)
router.put('/:feedId', controller.updateFeed)
router.delete('/:feedId', controller.deleteFeed)

module.exports = router