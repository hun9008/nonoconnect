import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import UserBlock from './UserBlock';

const SideBar = ({ BlockInfo, onExpand, onReject, isExpanded, sideWidth}) => {

    const buttonText = isExpanded ? '숨김' : '자세히';

    


    // const [isExpanded, setIsExpanded] = useState(false);
    // const [buttonText, setButtonText] = useState('자세히');
    // const sidebarHeight = isExpanded ? 400 : 200; // Adjust the height as needed

    // const handleDetailsButton = () => {
    //     setIsExpanded(!isExpanded);
    //     setButtonText(isExpanded ? '자세히' : '숨김');
    // };
    
    return (
        <View style={{
            height: 800,
            backgroundColor: 'white',
            padding: 20,
            borderColor: 'black', 
            borderWidth: 1, 
            borderRadius: 10,

            //   justifyContent: 'center', // 세로 중앙 정렬
        }}>
            <View style={{alignItems: 'center'}}>
                <Text>{BlockInfo.user.name ? `${BlockInfo.user.name}이(가) 요청을 수락했습니다.` : 'Sidebar Content'}</Text>
                    {/* 여기에 사이드바의 추가 내용을 넣을 수 있습니다. */}
                <View style={{ flexDirection: 'row', position: 'absolute', top: 40}}>
                    <TouchableOpacity onPress={onExpand} style={{ marginRight: 10, padding: 10, backgroundColor: '#FFDB0F', borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
                        <Text>{buttonText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10, borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
                        <Text>길안내</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onReject} style={{ marginLeft: 10, padding: 10, backgroundColor: '#FFDB0F', borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
                        <Text>거절</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={{ margin: 10, alignItems: 'left', flexDirection: 'column', position: 'absolute', top: 90, padding: 10}}>
                {/* {BlockInfo && <UserBlock user={BlockInfo.user} />} */}
                <Text style={{ fontSize: 20, textAlign: 'left', marginTop: 10 ,marginLeft: 10}}>{BlockInfo.title}</Text>
                <Text style={{ fontSize: 16, textAlign: 'left', marginTop: 5 ,marginLeft: 10}}>{BlockInfo.content}</Text>
                <Image source={{uri: BlockInfo.req_img}} style={{width: sideWidth * 0.9, height: 150, marginTop:20}}/>
            </View>
        </View>
    );
};

export default SideBar;
