import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SideBar = ({user, onExpand, isExpanded}) => {

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
            height: 600,
            backgroundColor: 'white',
            padding: 20,
            borderColor: 'black', 
            borderWidth: 1, 
            borderRadius: 10,
            alignItems: 'center', // 가로 중앙 정렬
            //   justifyContent: 'center', // 세로 중앙 정렬
        }}>
            <Text>{user ? `${user}이(가) 요청을 수락했습니다.` : 'Sidebar Content'}</Text>
                {/* 여기에 사이드바의 추가 내용을 넣을 수 있습니다. */}
            <TouchableOpacity onPress={onExpand}>
                <Text>{buttonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>길안내</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>거절</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SideBar;
