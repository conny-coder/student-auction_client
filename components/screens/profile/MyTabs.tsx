import React, { FC, useState } from 'react';
import { View, Pressable } from 'react-native';
import StyledText from '@/components/ui/StyledText';
import Auction, { AuctionProps } from '@/components/Auction';
import Slider from '@/components/Slider';
import HomeAuctionsLoader from '@/components/loaders/HomeAuctionsLoader';

const TABS = ['Мої лоти', 'Мої ставки', 'Вибране'];

interface MyTabsProps {
  myLots: AuctionProps[];
  myBids: AuctionProps[];
  favorites: AuctionProps[];
  isLoadingLots: boolean;
  isLoadingBids: boolean;
  isLoadingFavorites: boolean;
}

const MyTabs: FC<MyTabsProps> = ({
  myLots,
  myBids,
  favorites,
  isLoadingLots,
  isLoadingBids,
  isLoadingFavorites
}) => {
  const [activeTab, setActiveTab] = useState('Мої лоти');

  const renderContent = () => {
    switch (activeTab) {
      case 'Мої лоти':
        return isLoadingLots ? (
          <Slider data={["", ""]} renderItem={() => <HomeAuctionsLoader />} />
        ) : myLots.length === 0 ? (
          <StyledText color="text-gray-70p">Немає лотів</StyledText>
        ) : (
          <Slider
            data={myLots.slice(0, 8)}
            renderItem={(item, index) => <Auction {...item} key={index} />}
          />
        );

      case 'Мої ставки':
        return isLoadingBids ? (
          <Slider data={["", ""]} renderItem={() => <HomeAuctionsLoader />} />
        ) : myBids.length === 0 ? (
          <StyledText color="text-gray-70p">Немає ставок</StyledText>
        ) : (
          <Slider
            data={myBids.slice(0, 8)}
            renderItem={(item, index) => <Auction {...item} key={index} />}
          />
        );

      case 'Вибране':
        return isLoadingFavorites ? (
          <Slider data={["", ""]} renderItem={() => <HomeAuctionsLoader />} />
        ) : favorites.length === 0 ? (
          <StyledText color="text-gray-70p">Немає у вибраному</StyledText>
        ) : (
          <Slider
            data={favorites.slice(0, 8)}
            renderItem={(item, index) => <Auction {...item} key={index} />}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View>
      <View className="flex-row justify-around mb-4">
        {TABS.map((tab) => (
          <Pressable key={tab} onPress={() => setActiveTab( tab )}>
            <View className="items-center px-4 py-1">
              <StyledText
                className={`text-lg`}
                color={activeTab === tab ? 'text-white' : 'text-gray-70p'}
              >
                {tab}
              </StyledText>

              {activeTab === tab && (
                <View style={{
                  height: 2,
                  backgroundColor: 'white',
                  marginTop: 2,
                  borderRadius: 2,
                  alignSelf: 'center',
                  width: '100%' 
                }} />
              )}
            </View>
          </Pressable>
        ))}
      </View>

      <View className="gap-4">{renderContent()}</View>
    </View>
  );
};

export default MyTabs;
