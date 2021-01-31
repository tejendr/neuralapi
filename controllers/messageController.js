/** @format */

const Message = require("../models/messageModel");

exports.createChat = async (req, res) => {
	try {
		const foundMessage = await Message.findOne({
			candidateId: req.params.candidateId
		});

		if (foundMessage) {
			const updatedMessage = await Message.findByIdAndUpdate(
				foundMessage._id,
				{
					$push: { chats: req.body.chat }
				},
				{
					new: true,
					runValidators: true
				}
			);
			res.status(201).json({
				status: "Updated",
				data: { data: updatedMessage }
			});
		} else {
			const docBody = {
				candidateId: req.params.candidateId,
				chats: [req.body.chat]
			};

			const message = await Message.create(docBody);
			res.status(200).json({
				status: "success",
				data: {
					data: message
				}
			});
		}
	} catch (error) {
		res.json({
			status: "Failed",
			error: error
		});
	}
};

exports.getChat = async (req, res) => {
	try {
		const message = await Message.findOne({
			candidateId: req.params.candidateId
		}).populate("candidateId");

		res.status(200).json({
			status: "success",
			data: {
				data: message
			}
		});
	} catch (error) {
		res.json({
			status: "Failed",
			error: error
		});
	}
};
