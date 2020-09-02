
module.exports = function(app,io){
    const { User } = require('../models/User');
    const {Chat,CreateChat} = require('../models/Chat');
    app.post('/addnewfriend',(req,res)=>{
        //good is mean if nothing bad hppen ...
        var good =true;
        let {sender,geter} = req.body;
        let ids = [sender._id,geter._id];
        let errorMessage='';
        geter.status='sender';
        sender.status='waiting';
        User.find({_id:{$in:ids}},(err,users)=>{
            if(err||!users){
                console.log('error or not users found')
                console.log(users)
                console.log(err)
                good=false;
            }else{
                //users[0] is the sender  users[1] is the geter
                //if thay dont have each ather so you can add
                if(!users[0].friends[ids[1]]&&!users[1].friends[ids[0]]){
                    
                    
                   
                    users.forEach(user=>{
                        if(String(user._id)===String(geter._id)){
                            user.friends[sender._id]=sender;
                        }
                        else if(String(user._id)===String(sender._id)){
                            user.friends[geter._id]=geter
                        }else{
                            good=false;

                            errorMessage =('error cant add friend for some ')
                            return;
                        }
                        user.markModified('friends');
                        user.save(err=>{
                            if(err){
                                console.log(err);
                                good=0;
                            }
                        });
        
                    });
                }else{
                    good=false;
                    errorMessage =(' try to add old friends')
                }
            }
            if(good){
                io.emit('newFriendReq'+sender._id,geter);
                io.emit('newFriendReq'+geter._id,sender);
                res.send('good');
            }else{
                io.emit('error'+sender._id,errorMessage);
                io.emit('error'+geter._id,errorMessage);
                res.send('bad');
            }
        });
        
  
    
    
    });
    
    
    app.post('/friendreqaccept',(req,res)=>{
        //good is mean if nothing bad hppen ...
        let good =true;
        let {accepter,sender}=req.body;
        let ids = [sender._id,accepter._id];
        let error ='';
        User.find({_id:{$in:ids}},async(err,users)=>{
            if(err||!users){
                console.log('error or not users found')
                console.log(users)
                console.log(err)
                good=false;
            }else{
                if(users[0].friends[users[1]._id]&&users[1].friends[users[0]._id]){
                    if(users[0].friends[users[1]._id].status==='accept'||users[1].friends[users[0]._id].status==='accept'){
                        good=false;
                        error=(' try to accept someone wehen he/she already have him');
                        
                    }else{
                      const data=  await CreateChat(users,'friends');
                      if(!data.err){
                        accepter.status='accept';
                        sender.status='accept';
                          accepter.chatId=data.id;
                          sender.chatId=data.id;
                        for (let i = 0; i < users.length; i++) {

                            for (let j = 0; j < users.length; j++) {
                                if(j!==i){
                                    users[i].friends[users[j]._id].status='accept';
                                    users[i].friends[users[j]._id].chatId=data.id;
                                }
                            }
                            users[i].markModified('friends');
                            users[i].save(err=>{
                                if(err){
                                    good=false;
                                    error=('not save in create Chat and Accept friend req');
                                    return;
                                }
                            })
                        }
             
                      }else{
                          console.log(data.err)
                          good=false;
                      }


                    }

                }else{
                    good=false;
                    error=('someone try to accept friend req  when he/she cant f')
                }

            }

            if(good){
                io.emit('FirendsReqAccept'+sender._id,{type:'accept',user:accepter});
                io.emit('FirendsReqAccept'+accepter._id,{type:'accept',user:sender});
                res.send('good');
            }else{
                io.emit('error'+sender._id,error);
                io.emit('error'+accepter._id,error);
                res.send('bad');
                console.log(error)
            }
        
    
        

        })

    
    })
    
    
    app.post('/getUserForSerach',(req,res)=>{
        User.find({},(err,users)=>{
            if(err){
                console.log(err)
                res.send('not found')
            }else{
                const usersFilter=[];
                users.forEach(user=>{
                    usersFilter.push({firstName:user.firstName,lastName:user.lastName,_id:user._id,email:user.email,img:user.imageProfile})
                })
                res.send(usersFilter);
            }
    
    
        });
    });

    app.post('/deletefriendreq', (req,res)=>{
        let good =true;
        let {sender,geter} = req.body;
        let ids = [sender._id,geter._id];
        let error = '';
        sender.status='delete';
        geter.status='delete';
        User.find({_id:{$in:ids}},(err,users)=>{
        if(err){
            good=false;
            error=('err delete friend');
            console.log(err);
        }else{
            
         users.forEach((user)=>{
            if(String(user._id)===String(geter._id)){
                user.friends[sender._id].status='delete';
            }
            else if(String(user._id)===String(sender._id)){
                user.friends[geter._id].status='delete';
            }else{
                good=false;

                error =('error cant add friend for some ')
                return;
            }
            user.markModified('friends');
            user.save(err=>{
                if(err){
                    error=(err);
                    good=false;
                }
            })
    
         });
    
        }
        if(good){
            io.emit('deleteFriend'+sender._id,geter);
            io.emit('deleteFriend'+geter._id,sender);
            res.send('good');
        }else{
            io.emit('error'+sender._id,error);
            io.emit('error'+geter._id,error);
            res.send('bad');
        }
    });
      
    });
    
    

}


