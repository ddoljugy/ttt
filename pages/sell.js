import { useState } from 'react';
import axios from 'axios';

export default function Sell() {
    const [carId, setCarId] = useState('');
    const [sourceRegion, setSourceRegion] = useState('seoul');
    const [destinationRegion, setDestinationRegion] = useState('sao_paulo'); // 기본값은 상파울루

    // 원본 리전을 선택했을 때 대상 리전을 자동 설정
    const handleSourceRegionChange = (e) => {
        const selectedSource = e.target.value;
        setSourceRegion(selectedSource);

        // 원본이 서울이면 대상은 상파울루, 원본이 상파울루면 대상은 서울
        if (selectedSource === 'seoul') {
            setDestinationRegion('sao_paulo');
        } else if (selectedSource === 'sao_paulo') {
            setDestinationRegion('seoul');
        }
    };

    const handleSell = async (e) => {
        e.preventDefault();
        
        try {
            // sourceRegion에 따라 엔드포인트를 동적으로 설정
            const endpoint = sourceRegion === 'seoul' 
                ? 'nexthop-rds-db-1.clqqu4qmyaak.ap-northeast-2.rds.amazonaws.com' 
                : 'nexthop-rds-db-1.cd88wyyqyzye.sa-east-1.rds.amazonaws.com';

            // API Gateway의 엔드포인트로 POST 요청 전송
            const response = await axios.post(endpoint, {
                carId,
                sourceRegion,
                destinationRegion
            });
            
            // 요청이 성공하면 서버에서 받은 응답 처리
            console.log('Car moved successfully:', response.data);
            
            // 성공적으로 처리되면 페이지 이동
            window.location.href = '/show';  // 차량 이동 후 결과 페이지로 이동

        } catch (error) {
            console.error('Error moving car:', error);
            alert('Failed to move car');
        }
    };

    return (
        <form onSubmit={handleSell}>
            <label>Car ID:</label>
            <input
                type="text"
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
                required
            />
            <label>Source Region:</label>
            <select value={sourceRegion} onChange={handleSourceRegionChange}>
                <option value="seoul">Seoul</option>
                <option value="sao_paulo">Sao Paulo</option>
            </select>
            <label>Destination Region:</label>
            <input type="text" value={destinationRegion} readOnly /> {/* 대상 리전은 읽기 전용 */}
            <button type="submit">Sell</button>
        </form>
    );
}
