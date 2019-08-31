import _ from 'lodash';
import request from 'request';

class PipedriveController {

    createNewDeal = (chatLog, chatRoom, pipedriveAPIkey) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let title = _.map(chatRoom.connectedUsers, (element) => {
            return element.nickname
        }).join(', ');

        request.post({
            headers: headers,
            url: `https://api.pipedrive.com/v1/deals?api_token=${pipedriveAPIkey}`,
            body: JSON.stringify({
                title: title
            })
        }, (error, response, body) => {

            let dealId = JSON.parse(body).data.id;
            let content = _.map(chatLog.log, (element) => {
                return `${element.nickname}: ${element.message}`
            }).join("\n");

            request.post({
                headers: headers,
                url: `https://api.pipedrive.com/v1/notes?api_token=${pipedriveAPIkey}`,
                body: JSON.stringify({
                    content: content,
                    deal_id: dealId
                })
            });
        });
    };
}


module.exports = new PipedriveController();