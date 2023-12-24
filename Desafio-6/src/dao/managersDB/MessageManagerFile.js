import messageModel from "../models/message.model.js";


class MessageManagarFile{

    createMessage = async (chat) => {
        try {
            const message = await messageModel.create(chat)
            return message
        } catch (error) {
            console.log(error)
        }
        
    }

}

export {MessageManagarFile};