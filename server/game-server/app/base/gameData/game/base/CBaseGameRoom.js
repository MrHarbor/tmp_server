/**
 * Created by z on 2017/12/28.
 */
require("../../../../core/Core");
var enums = require("../../../../consts/enums");
Class({
    ClassName:"Game.Data.Room.CBase",
    m_App:{
        get:function()
        {
            var dataCenter = this.DataCenter;
            if(dataCenter)
            {
                return dataCenter.m_App;
            }
            return null;
        }
    },
    status:0,
    ctor:function(dataCenter,did,gid)
    {
        Object.defineProperty(this, "deskId", {
            get: function () {
                return did;
            }
        });
        Object.defineProperty(this, "DataCenter", {
            get: function () {
                return dataCenter;
            }
        });

        Object.defineProperty(this, "gameId", {
            get: function () {
                return gid;
            }
        });

        this.xueIdx = 0;/// �ڼ�ѥ��
        this.cIdx = 0;/// ��ǰѥ�ӵڼ���
        //var channelName = this.gid + "_" + this.did;
        //this.Channel = dataCenter.m_App.get('channelService').getChannel(channelName, true);
        this.mStreams = [];
        this.History = [];
    } ,
    toJSON:function()
    {
        return {
            cards:this.Cards,
            status:this.status,
            gameHistory:this.History,
            pots:this.Pots,

            gameType:this.GameType,
            nextWho:this.nextWho,
            pCount:this.PersonCount,
            deskId:this.deskId,
            gameId:this.gameId,
            xueIdx:this.xueIdx,
            cIdx:this.cIdx,
            betRecord:this.BetRecord,
            deskName:this.mDeskName,    // ��������
            countDown:this.mCountDown, // ����ʱ����
            currentDown:this.mCurrentDown, // ��ǰ��ʱ��ʱ��
            moudle:this.mMoudle,           // ���� 1����һ 2����̨
            streams:this.mStreams||[],     // ��id �б�
        }
    },



    pushGameInfo:function(gameId,deskId,key,info)
    {
        var res = {};
        res[key] = {v:[this.deskId,info]};
        if(this.Channel)
        {

            info.status = this.status;

            if(!key)
                return;



            this.Channel.pushMessage(enums.PUSH_KEY.PUSH,res , Core.errHandler);
        }
    },
    masterOnLine:function(masterid)
    {
        if(this.mMasterId && this.mMasterId!= masterid)
            return false;
        this.mMasterId = masterid;
        return true;

    },

    masterOffLine:function(masterid)
    {
        this.mMasterId = null;
    }

})