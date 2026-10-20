import { BouquetData, FlowerColorTheme, MusicTrack } from '../types/bouquet';

export const DEFAULT_BOUQUET: BouquetData = {
  id: '6abe9a253085514f7389dcd6',
  introText: "Mừng ngày phụ nữ Việt Nam 20-10, 12A5",
  flowerColor: 'classic',
  letterTitle: 'Gửi các bông hồng xinnh đẹp của lớp 12A5!',
  letterContent: [
    'Nhân dịp đặc biệt này, thay mặt các bạn nam trong lớp, chúng mình muốn gửi đến các bạn những lời chúc tốt đẹp nhất. Chúc các bạn luôn 8386, xinh đẹp, vui vẻ, tự tin và luôn giữ cho mình sự rạng rỡ nhé.',
    'Cảm ơn các bạn vì đã là một phần thanh xuân của lớp 12A5, làm cho chúng trở nên nhiều màu sắc hơn, vì những nụ cười, sự quan tâm và những khoảnh khác mà chúng ta cùng nhau trải qua. Chúc các bạn học tập thật tốt, đạt được những mục tiêu mình mong muốn và đủ mạnh mẽ để tiếp tục theo đuổi những ước mơ của bản thân',
    'Thanh xuân của chúng ta cũng đang dần khép lại. Mong rằng chúng ta sẽ dành khoảng thời gian ít còn lại để cùng nhau tạo nên những khoảnh khác đẹp nhất cuối đời học sinh nhé.',
    'Chúc các cô gái 12A5 luôn là phiên bản tuyệt vời nhất của chính mình. Mong các bạn luôn được yêu thương, trân trọng và hạnh phúc, không chỉ hôm nay mà còn là chặng đường phía trước nữa nhé💗'
  ],
  letterSignature: 'Thân ái, các bạn nam lớp 12A5!',
  vipPhotos: [
    '/assets/photos/1.jpg',
    '/assets/photos/2.jpg',
    '/assets/photos/3.jpg',
    '/assets/photos/4.jpg'
  ],
  musicType: 'Sample',
  musicPath: '/assets/musics/tx.mp3',
  customMusic: null,
  isSavePermanent: true,
  createdAt: '2026-10-01T17:36:37.671Z'
};

export const FLOWER_COLOR_THEMES: FlowerColorTheme[] = [
  {
    id: 'classic',
    name: 'Hồng Tulip',
    badge: 'Hồng Tulip (Cổ điển)',
    subtitle: 'Cổ điển • Chuẩn',
    primaryColor: '#ff6f91',
    secondaryColor: '#ff9671',
    accentGlow: 'rgba(255, 111, 145, 0.6)',
    thumbImage: '/assets/images/demo_flower_classic.png'
  },
  {
    id: 'mix',
    name: 'Mix Candy',
    badge: 'Mix Candy (Kẹo Ngọt)',
    subtitle: 'Ngọt ngào • Rực rỡ',
    primaryColor: '#ff758c',
    secondaryColor: '#ff7eb3',
    accentGlow: 'rgba(255, 117, 140, 0.6)',
    thumbImage: '/assets/images/demo_flower_mix.png'
  },
  {
    id: 'pink_mix',
    name: 'Hồng Pastel',
    badge: 'Hồng Pastel (Dịu Dàng)',
    subtitle: 'Dịu dàng • Nữ tính',
    primaryColor: '#f8a5c2',
    secondaryColor: '#f78fb3',
    accentGlow: 'rgba(248, 165, 194, 0.6)'
  },
  {
    id: 'pink_tulip_mix',
    name: 'Tulip Hồng Mix',
    badge: 'Tulip Hồng Mix (Tươi Tắn)',
    subtitle: 'Tươi tắn • Lãng mạn',
    primaryColor: '#fd79a8',
    secondaryColor: '#e84393',
    accentGlow: 'rgba(253, 121, 168, 0.6)'
  },
  {
    id: 'raspberry_pink',
    name: 'Hồng Mâm Xôi',
    badge: 'Hồng Mâm Xôi (Quyến Rũ)',
    subtitle: 'Quyến rũ • Nổi bật',
    primaryColor: '#e056fd',
    secondaryColor: '#be2edd',
    accentGlow: 'rgba(224, 86, 253, 0.6)'
  },
  {
    id: 'peach',
    name: 'Cam Đào',
    badge: 'Cam Đào (Ấm Áp)',
    subtitle: 'Ấm áp • Trẻ trung',
    primaryColor: '#fab1a0',
    secondaryColor: '#ff7675',
    accentGlow: 'rgba(250, 177, 160, 0.6)'
  },
  {
    id: 'coral_champagne',
    name: 'San Hô & Rượu Vang',
    badge: 'San Hô & Champagne',
    subtitle: 'Quý phái • Tinh tế',
    primaryColor: '#f3a683',
    secondaryColor: '#e77f67',
    accentGlow: 'rgba(243, 166, 131, 0.6)'
  },
  {
    id: 'magenta',
    name: 'Tím Hồng',
    badge: 'Tím Hồng (Sang Trọng)',
    subtitle: 'Sang trọng • Sâu lắng',
    primaryColor: '#d63031',
    secondaryColor: '#fd79a8',
    accentGlow: 'rgba(214, 48, 49, 0.6)'
  },
  {
    id: 'purple',
    name: 'Tím Thủy Chung',
    badge: 'Tím Thủy Chung (Mộng Mơ)',
    subtitle: 'Mộng mơ • Chung thủy',
    primaryColor: '#a29bfe',
    secondaryColor: '#6c5ce7',
    accentGlow: 'rgba(162, 155, 254, 0.6)'
  },
  {
    id: 'blue',
    name: 'Xanh Hy Vọng',
    badge: 'Xanh Hy Vọng (Bình Yên)',
    subtitle: 'Bình yên • Thanh khiết',
    primaryColor: '#74b9ff',
    secondaryColor: '#0984e3',
    accentGlow: 'rgba(116, 185, 255, 0.6)'
  },
  {
    id: 'white',
    name: 'Trắng Tinh Khôi',
    badge: 'Trắng Tinh Khôi (Thuần Khiết)',
    subtitle: 'Thanh lịch • Nhẹ nhàng',
    primaryColor: '#dfe6e9',
    secondaryColor: '#b2bec3',
    accentGlow: 'rgba(223, 230, 233, 0.6)'
  },
  {
    id: 'vintage',
    name: 'Nâu Cổ Điển',
    badge: 'Nâu Cổ Điển (Hoài Niệm)',
    subtitle: 'Vintage • Sâu sắc',
    primaryColor: '#cd84f1',
    secondaryColor: '#c56cf0',
    accentGlow: 'rgba(205, 132, 241, 0.6)'
  }
];

export const MUSIC_PLAYLIST: MusicTrack[] = [
  {
    id: 'danhchoem',
    name: 'Dành Cho Em',
    artist: 'Hoàng Tôn',
    duration: '3:50',
    url: '/assets/musics/danhchoem.mp3',
    tags: ['love', 'ngot-ngao', 'featured']
  },
  {
    id: 'anhnangcuaanh',
    name: 'Ánh Nắng Của Anh',
    artist: 'Đức Phúc',
    duration: '4:15',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/anhnangcuaanh.mp3',
    tags: ['love', 'lang-man', 'featured']
  },
  {
    id: 'noinaycoanh',
    name: 'Nơi Này Có Anh',
    artist: 'Sơn Tùng M-TP',
    duration: '4:20',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/noinaycoanh.mp3',
    tags: ['love', 'hot-trend', 'featured']
  },
  {
    id: 'dunglamtraitimanhdau',
    name: 'Đừng Làm Trái Tim Anh Đau',
    artist: 'Sơn Tùng M-TP',
    duration: '4:10',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/dunglamtraitimanhdau.mp3',
    tags: ['love', 'vui-tuoi']
  },
  {
    id: 'perfect',
    name: 'Perfect',
    artist: 'Ed Sheeran',
    duration: '4:23',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/perfect.mp3',
    tags: ['us-uk', 'lang-man', 'featured']
  },
  {
    id: 'athousandyears',
    name: 'A Thousand Years',
    artist: 'Christina Perri',
    duration: '4:45',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/athousandyears.mp3',
    tags: ['us-uk', 'kinh-dien']
  },
  {
    id: 'iloveyou',
    name: 'I Love You 3000',
    artist: 'Stephanie Poetri',
    duration: '3:30',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/iloveyou.mp3',
    tags: ['us-uk', 'de-thuong']
  },
  {
    id: 'givemeyourforever',
    name: 'Give Me Your Forever',
    artist: 'Zack Tabudlo',
    duration: '3:58',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/givemeyourforever.mp3',
    tags: ['us-uk', 'lang-man']
  },
  {
    id: 'yeuemratnhieu',
    name: 'Yêu Em Rất Nhiều',
    artist: 'Hoàng Tôn',
    duration: '3:45',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/yeuemratnhieu.mp3',
    tags: ['love', 'lang-man']
  },
  {
    id: 'daobuochongkong',
    name: 'Dạo Bước Hồng Kông',
    artist: 'Acoustic Chill',
    duration: '2:45',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/daobuochongkong.mp3',
    tags: ['chill', 'nhe-nhang']
  },
  {
    id: 'votuyetvoinhat',
    name: 'Vợ Tuyệt Vời Nhất',
    artist: 'Vũ Duy Khánh',
    duration: '4:30',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/votuyetvoinhat.mp3',
    tags: ['vo-chong', 'y-nghia']
  },
  {
    id: 'cochacyeuladay',
    name: 'Có Chắc Yêu Là Đây',
    artist: 'Sơn Tùng M-TP',
    duration: '3:22',
    url: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/cochacyeuladay.mp3',
    tags: ['de-thuong']
  }
];

export const LETTER_SUGGESTIONS = [
  {
    label: '20/10 & 8/3 (Ngày Phụ Nữ)',
    title: 'Gửi người phụ nữ tuyệt vời nhất của anh,',
    content: [
      'Nhân ngày đặc biệt hôm nay, anh muốn gửi đến em tất cả những lời chúc ngọt ngào và chân thành nhất từ trái tim.',
      'Cảm ơn em đã xuất hiện, mang đến cho anh nụ cười, sự ấm áp và vô vàn khoảnh khắc dịu dàng mỗi ngày.',
      'Chúc em luôn xinh đẹp rạng ngời, luôn tự tin, hạnh phúc và bình an trong vòng tay anh.',
      'Mãi yêu em!'
    ],
    signature: 'Một nửa luôn yêu thương em 💞'
  },
  {
    label: 'Sinh nhật người yêu',
    title: 'Happy Birthday em yêu!',
    content: [
      'Chúc mừng sinh nhật cô gái nhỏ làm tim anh rung rinh mỗi ngày!',
      'Thêm một tuổi mới, chúc em luôn vui tươi, gặp nhiều may mắn và đạt được mọi ước mơ mà em ấp ủ.',
      'Dù cuộc sống có thế nào, hãy luôn nhớ rằng phía sau em luôn có anh đồng hành, chở che và yêu thương em vô điều kiện.',
      'Happy birthday my love!'
    ],
    signature: 'Người thương của em 🎂✨'
  },
  {
    label: 'Kỷ niệm ngày yêu (Anniversary)',
    title: 'Kỷ niệm những ngày tháng bên nhau,',
    content: [
      'Thời gian trôi nhanh thật, nhưng từng ngày có em đều là những ngày đáng nhớ nhất trong cuộc đời anh.',
      'Cảm ơn em vì đã cùng anh trải qua những buồn vui, cùng nắm tay nhau đi qua những nốt thăng trầm.',
      'Mong rằng những năm tháng tiếp theo, chúng ta vẫn sẽ cùng nhau già đi, vẫn giữ trọn vẹn tình cảm ngọt ngào như ngày đầu.',
      'Yêu em nhiều hơn mỗi ngày!'
    ],
    signature: 'Mãi bên nhau em nhé 💖'
  },
  {
    label: 'Tỏ tình lãng mạn',
    title: 'Gửi người anh thầm thương,',
    content: [
      'Có những điều anh đã giấu trong lòng thật lâu, và hôm nay anh muốn nói với em.',
      'Mỗi lần nhìn thấy nụ cười của em, mọi mệt mỏi trong anh dường như tan biến. Em đã trở thành người đặc biệt nhất đối với anh từ lúc nào chẳng hay.',
      'Anh mong có cơ hội được chăm sóc, che chở và cùng em bước tiếp trên chặng đường dài phía trước.',
      'Hãy cho anh cơ hội được là người yêu của em nhé!'
    ],
    signature: 'Người luôn hướng về em 🌹'
  }
];

export const INTRO_TEXT_PRESETS = [
  "Happy Vietnamese Women's Day 20/10",
  "Happy International Women's Day 8/3",
  "Happy Birthday Em Yêu 🎂",
  "Happy Valentine's Day 💕",
  "Kỷ Niệm 1 Năm Yêu Nhau 💖",
  "Gửi Người Tôi Yêu Thương Nhất ✨",
  "Cảm Ơn Em Đã Đến Bên Anh 🌸",
  "Always By Your Side 💫"
];
