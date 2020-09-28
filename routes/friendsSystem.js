
module.exports = function(app,io){
    
    const { User } = require('../models/User');
    const {Chat,CreateChat} = require('../models/Chat');
    function er (user1,user2,errorMessage,res){
        io.emit('error'+user1._id,errorMessage);
        io.emit('error'+user2._id,errorMessage);
        res.send('bad');
        console.log(errorMessage)
    }


    // there  are few types of status that a frirend can have 
    // 1 "waiting " mean that you got a friend request but you didnt accept it 
    // 2 "sender" mean that you send a friend request but the request still not got respond 
    // 3 "accept"  mean that they are aceept and now they are friends
    // 4 "decline" mean  that your friend request got decline
    // 5 "idecline" mean that you decline tha friend request 
    // 6 "delete"   mean that someone delete  each other 
    // 7 "iblock" mean that i block friend/not yet a friend 
    // 8 "block" mean that i got block 
    const alltypes = ['waiting', "sender","accept" ,"iblock", "block", ];
    const arryForAddFriend= ['waiting', "sender","accept" , "block",];
    const arrForAcceptFriend = ["accept" ,"iblock", "block",];
    app.post('/api/user/addnewfriend',(req,res)=>{
        //allGoodORNot is mean if nothing bad hppen ...
        // you need to send obj that contian geter that is the one to will get the req and sender is clear!
        var allGoodORNot =true;
        let errorMessage='';
        let {sender,geter} = req.body;
        if(!typeof(sender)==="object"||!typeof(geter)==="object"){
            allGoodORNot=false;
            errorMessage=('error you didnt send status info ');
            er(sender,geter,errorMessage);

        }else {
        let ids = [sender._id,geter._id];
        geter.status='waiting';
        sender.status='sender';
        User.find({_id:{$in:ids}},(err,users)=>{
            if(err||!users){
                console.log('error or not users found')
                console.log(users)
                console.log(err)
                allGoodORNot=false;
            }else{
                //users[0] is the sender  users[1] is the geter
                //if thay dont have each ather so you can add
                    if(users[0].connections[ids[1]]||users[1].connections[ids[0]]){
                    
                            arryForAddFriend.forEach(status=>{

                                    if(users[0].connections[ids[1]].status===status||users[1].connections[ids[0]].status===status){
                                        console.log(`you have a error to add a friend type: ${status}`)
                                        allGoodORNot=false;
                                        errorMessage = (`you have a error to add a friend type: ${status}`);
                                    }

                            });

                    }
                    if(allGoodORNot){
                        users.forEach(user=>{
                            if(String(user._id)===String(geter._id)){
                                user.connections[sender._id]=sender;
                            }
                            else if(String(user._id)===String(sender._id)){
                                user.connections[geter._id]=geter
                            }else{
                                allGoodORNot=false;
    
                                errorMessage =('error cant add friend for some ')
                                return;
                            }
                            user.markModified('connections');
                            user.save(err=>{
                                if(err){
                                    console.log(err);
                                    allGoodORNot=0;
                                }
                            });
            
                        });
    
                    }
            }
            if(allGoodORNot){
                console.log('add friend')
                io.emit('newFriendReq'+sender._id,geter);
                io.emit('newFriendReq'+geter._id,sender);
                res.send(errorMessage);
            }else{
                er(sender,geter,errorMessage,res);
            }
            
        });
        
  
        }
    
    });

    app.post('/api/user/friendreqaccept',(req,res)=>{
        //status is mean if nothing bad hppen ...
        // you need to send obj thet contain accepter who is the one who got the req and now he/she accept the req ; sender is the one send the friend req OMG! ;
        let status =true;
        let error ='';
        let {sender ,accepter} = req.body
        if(!sender||!accepter){
            console.log('dsa')
            status=false;
                error=('error you didnt send status info ');
        }else {
       
            let ids = [sender._id,accepter._id];
            User.find({_id:{$in:ids}},async(err,users)=>{
                if(err||!users){
                    console.log('error or not users found')
                    console.log(users)
                    console.log(err)
                    status=false;
                }else{
                    if(users[0].connections[users[1]._id]&&users[1].connections[users[0]._id]){
                        arrForAcceptFriend.forEach(status=>{
                            if(users[0].connections[users[1]._id].status===status||users[1].connections[users[0]._id].status===status){
                                console.log(`you have a error to accept a friend status: ${status}`)
                                status=false;
                                errorMessage = (`you have a error to accept a friend a status: ${status}`);
                                return;
                            }

                        });

                   if(status){
                          const data=  await CreateChat(users,'friends');
                          if(!data.err){
                            accepter.status='accept';
                            sender.status='iaccept';
                              accepter.chatId=data.id;
                              sender.chatId=data.id;
                            for (let i = 0; i < users.length; i++) {
    
                                for (let j = 0; j < users.length; j++) {
                                    if(j!==i){
                                        users[i].connections[users[j]._id].status='accept';
                                        users[i].connections[users[j]._id].chatId=data.id;
                                    }
                                }
                                users[i].markModified('connections');
                                users[i].save(err=>{
                                    if(err){
                                        status=false;
                                        error=('not save in create Chat and Accept friend req');
                                        return;
                                    }
                                })
                            }
                 
                          }else{
                              console.log(data.err)
                              status=false;
                          }
    
    
                        }
    
                    }else{
                        status=false;
                        error=('someone try to accept friend req  when he/she not a  friend')
                    }
    
                }
    
                if(status){
                    console.log('accept friend')
               
                    io.emit('FirendsReqAccept'+sender._id,accepter);
                    io.emit('FirendsReqAccept'+accepter._id,sender);
                    res.send('status');
                }else{
                    io.emit('error'+sender._id,error);
                    io.emit('error'+accepter._id,error);
                    res.send('bad');
                    console.log(error)
                }
            
        
            
    
            })
    
        }
  
    
    })
    
    
    
    app.post('/api/user/deletefriendreq', (req,res)=>{
        // you need to send a obj that contain sender & geter  
        //sender is the one to delete the friend 
        //geter is the one who got delete  
        let status =true;
        let {sender,geter} = req.body;
        let error = '';
        if(!sender||!geter){
            console.log('dsa')
            status=false;
                error=('error you didnt send status info ');
        }else {
    
            let ids = [sender._id,geter._id];
            User.find({_id:{$in:ids}},(err,users)=>{
                if(err){
                    status=false;
                    error=('err delete friend');
                    console.log(err);
                }else{
                    if(users[0].connections[users[1]._id]&&users[1].connections[users[0]._id]){
                       delete users[0].connections[users[1]._id]
                        delete  users[1].connections[users[0]._id]

                        users.forEach((user)=>{

                            
                        user.markModified('connections');
                        user.save(err=>{
                            if(err){
                                error=(err);
                                status=false;
                            }
                        })
                        
                    });

                    }
           
                
            }
            if(status){
                console.log('delete friend')
                io.emit('deleteFriend'+sender._id,geter);
                io.emit('deleteFriend'+geter._id,sender);
                res.send('status');
            }else{
                io.emit('error'+sender._id,error);
                io.emit('error'+geter._id,error);
                res.send('bad');
                console.log(error)    
                }
            });
        }

     
      
 
        
    });
    
    app.post('/api/user/declineFriendReq',(req,res)=>{
        // req.body need to get a obj that contain sender obj and geter obj
        // sender is the one who dicline the req and geter is the one who send the
        // req  to the sender(the one who decline the req);
        let status =true;
        let {sender,geter} = req.body;
     
        let error = '';
        
        if(!sender||!geter){
            console.log('dsa')
            status=false;
                error=('error you didnt send status info ');
        }else {
            let ids = [sender._id,geter._id];
            User.find({_id:{$in:ids}},(err,users)=>{
                if(err){
                    status=false;
                    error=('error decline friend');
                    console.log(err);
                }else{
                    
                    if(users[0].connections[users[1]._id]&&users[1].connections[users[0]._id]){
                        delete users[0].connections[users[1]._id]
                         delete  users[1].connections[users[0]._id]
    
                         users.forEach((user)=>{
    
                             
                         user.markModified('connections');
                         user.save(err=>{
                             if(err){
                                 error=(err);
                                 status=false;
                             }
                         })
                         
                     });
    
                     }
                    
                }
                
                if(status){
                    console.log('decline friend')
                    io.emit('declineFriendReq'+sender._id,geter);
                    io.emit('declineFriendReq'+geter._id,sender);
                    res.send('status');
                }else{
                    io.emit('error'+sender._id,error);
                    io.emit('error'+geter._id,error);
                    res.send('bad');
                    console.log(error)
                }
                
                
            });
    
        }
   
        
        
        
        
    });
    app.post('/api/user/blockfriendreq',(req,res)=>{
        //this api is for block a friend. this api  need to get obj with 2 obj sender who is the one who want to block 
        // and the geter is the one who get block

        let status =true;
        let {sender,geter} = req.body;
        let ids = [sender._id,geter._id];
        let error = '';

        if(!typeof(sender)==="object"||!typeof(geter)==="object"){
            console.log('dsa')
            status=false;
                error=('error you didnt send status info ');
        }else {
    
            let ids = [sender._id,geter._id];
                User.find({_id:{$in:ids}},(err,users)=>{
                    
                    if(err||!users){
                        status=false;
                        error=('error its didnt work to block');
                        console.log(err,error);
                    }else{
                        // make sure that thay have each other 
                        if(users[0].connections[users[1]._id]&&users[1].connections[users[0]._id]){ 
                            sender.status='block';
                            geter.status='iblock';
                            users.forEach(user=>{
                                if(String(user._id)===String(geter._id)){
                                    user.connections[sender._id]=sender;
                                }
                                else if(String(user._id)===String(sender._id)){
                                        user.connections[geter._id]=geter
                                    }else{
                                        status=false;
            
                                        errorMessage =('error cant add friend for some ')
                                        return;
                                    }
                                    user.markModified('connections');

                                user.save(err=>{
                                    if(err){
                                        console.log(err)
                                        error='didnt save the block'
                                        status=false;

                                    }
                                });
                            })


                        }

                    }
                    if(status){
                        console.log('block friend')
                        io.emit('blockFriendReq'+sender._id,geter);
                        io.emit('blockFriendReq'+geter._id,sender);
                        res.send('status');
                    }else{
                        io.emit('error'+sender._id,error);
                        io.emit('error'+geter._id,error);
                        res.send('bad');
                        console.log(error)
                    }

                 });
        }


    });

    app.post('/api/user/unblockFirend',(req,res)=>{
  //allGoodORNot is mean if nothing bad hppen ...
        // you need to send obj that contian geter that is the one to will get unblock and sender is the one who want to unblock!
        var allGoodORNot =true;
        let errorMessage='';
        let {sender,geter} = req.body;
        if(!typeof(sender)==="object"||!typeof(geter)==="object"){
            allGoodORNot=false;
            errorMessage=('error you didnt send status info ');
            er(sender,geter,errorMessage);

        }else {



        }


    });

    app.post('/api/user/getUserForSerach',(req,res)=>{
     
        User.find({},(err,users)=>{
            if(err){
                console.log(err)
                res.send('not found')
            }else{
                const usersFilter=[];
                users.forEach(user=>{
                    usersFilter.push({firstName:user.firstName,lastName:user.lastName,_id:user._id,email:user.email,imageProfile:user.imageProfile})
                })
                res.send(usersFilter);
            }
    
    
        });
    });
    
}

