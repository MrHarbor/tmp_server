/**
 * Created by z on 2018/2/1.
 */
var net = require('net');
var fs = require('fs');

var helper = {

    start:function(app)
    {
        var rootPath = app.getBase();

        var crossDomainFile = fs.readFileSync(rootPath+"/config/data/crossdomain.xml",'utf-8');
        crossDomainFile+="\0";

         // ����һ��TCP������ʵ��������listen������ʼ����ָ���˿�
        // ����net.createServer()�Ļص���������Ϊ��connection���¼��Ĵ�����
        // ��ÿһ����connection���¼��У��ûص��������յ���socket������Ψһ��
        net.createServer(function(sock) {

            // ���ǻ��һ������ - �������Զ�����һ��socket����
            //console.warn('CONNECTED: ' +
            //    sock.remoteAddress + ':' + sock.remotePort);

            // Ϊ���socketʵ�����һ��"data"�¼�������
            sock.on('data', function(data) {
                //

                // �ط������ݣ��ͻ��˽��յ����Է���˵�����

                // [<policy-file-request/>
                if(data.indexOf("policy-file-request")>0)
                {
                    //console.warn(crossDomainFile);
                    sock.write(crossDomainFile);
                }
                else
                {
                    console.warn('DATA 2:['  + data+"]");
                    sock.write('');
                }



            });

            // Ϊ���socketʵ�����һ��"close"�¼�������
            //sock.on('close', function(data) {
            //    console.warn('CLOSED: ' +
            //        sock.remoteAddress + ' ' + sock.remotePort);
            //});

        }).listen(843,function()
        {

        });



    }
}

module.exports = helper;