import { BouquetData } from '../types/bouquet';

export interface GiftTemplate {
  id: string;
  templateType: 'tulip_classic' | 'red_rose' | 'birthday_cake' | 'love_anniversary' | 'sky_lanterns' | 'sunflower';
  title: string;
  badge: string;
  tagline: string;
  icon: string;
  previewGradient: string;
  data: BouquetData;
  anniversaryDays?: number;
  cakeMessage?: string;
}

export const GIFT_TEMPLATES: GiftTemplate[] = [
  {
    id: 'tulip_classic_2010',
    templateType: 'tulip_classic',
    title: 'Bó Hoa Tulip Kỷ Niệm 20/10',
    badge: 'Nguyên bản Giftory',
    tagline: 'Bó hoa Tulip cổ điển nở rộ với thỏ con, lá thư giấu kín & ảnh bay bổng',
    icon: '🌷',
    previewGradient: 'from-pink-600 via-rose-500 to-pink-400',
    data: {
      id: '6abe9a253085514f7389dcd6',
      introText: "Happy Vietnamese Women's Day 20/10",
      flowerColor: 'classic',
      letterTitle: 'Gửi tình yêu của anh,',
      letterContent: [
        'Nhân ngày 20/10 - ngày của những người phụ nữ tuyệt vời - anh muốn nói với em rằng: em là điều tuyệt vời nhất trong cuộc đời anh.',
        'Từ khi có em, mỗi ngày đều ý nghĩa hơn. Em cho anh động lực, cho anh niềm vui và cho anh một mái ấm để trở về.',
        'Chúc em luôn xinh đẹp, tràn đầy năng lượng và mãi bên anh. Cảm ơn em đã là một nửa hoàn hảo của anh.',
        'Yêu em mãi!'
      ],
      letterSignature: 'Một nửa của em 💞',
      vipPhotos: [
        '/assets/photos/sample_1.jpg',
        '/assets/photos/sample_2.jpg',
        '/assets/photos/sample_3.jpg',
        '/assets/photos/sample_4.jpg',
        '/assets/photos/sample_5.jpg',
        '/assets/photos/sample_6.jpg'
      ],
      musicType: 'Sample',
      musicPath: '/assets/musics/danhchoem.mp3',
      customMusic: null,
      isSavePermanent: true,
      createdAt: '2026-10-01T17:36:37.671Z'
    }
  },
  {
    id: 'red_rose_valentine',
    templateType: 'red_rose',
    title: 'Bó Hoa Hồng Đỏ Tình Yêu (Red Velvet)',
    badge: 'Lãng Mạn & Nồng Nàn',
    tagline: 'Hoa hồng nhung đỏ rực rỡ, mưa cánh hoa rơi lãng mạn & tình ca Perfect',
    icon: '🌹',
    previewGradient: 'from-red-700 via-rose-600 to-red-500',
    data: {
      id: 'rose_edition_valentine_2026',
      introText: 'Happy Valentine - Forever With You 💕',
      flowerColor: 'magenta',
      letterTitle: 'Gửi người con gái anh yêu nhất trần đời,',
      letterContent: [
        'Giữa hàng triệu người trên thế giới này, anh may mắn nhất vì đã tìm thấy em và được em yêu thương.',
        'Tình yêu của anh dành cho em như những đóa hồng nhung đỏ thắm, dù trải qua bao tháng ngày vẫn vẹn nguyên nồng cháy.',
        'Cảm ơn em vì đã là bến đỗ bình yên, là nguồn cảm hứng và là nụ cười rạng rỡ của anh mỗi sớm mai thức dậy.',
        'Hứa với anh mình sẽ cùng nhau già đi nhé, em yêu!'
      ],
      letterSignature: 'Yêu em vô điều kiện 🌹❤️',
      vipPhotos: [
        '/assets/photos/sample_2.jpg',
        '/assets/photos/sample_1.jpg',
        '/assets/photos/sample_4.jpg',
        '/assets/photos/sample_3.jpg',
        '/assets/photos/sample_5.jpg',
        '/assets/photos/sample_6.jpg'
      ],
      musicType: 'Sample',
      musicPath: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/perfect.mp3',
      customMusic: null,
      isSavePermanent: true,
      createdAt: '2026-10-14T08:20:00.000Z'
    }
  },
  {
    id: 'birthday_pro_cake',
    templateType: 'birthday_cake',
    title: 'Chúc Mừng Sinh Nhật (Bánh Kem & Thổi Nến)',
    badge: 'Hot Trend Sinh Nhật',
    tagline: 'Bánh kem 3 tầng phát sáng, thổi tắt nến sinh nhật điều ước & pháo hoa bay',
    icon: '🎂',
    cakeMessage: 'Happy Birthday My Love!',
    previewGradient: 'from-amber-500 via-pink-500 to-purple-600',
    data: {
      id: 'birthday_special_2026',
      introText: 'Happy Birthday Em Yêu - Tuổi Mới Rạng Rỡ 🎂✨',
      flowerColor: 'peach',
      letterTitle: 'Happy Birthday cô công chúa nhỏ của anh! 🎉',
      letterContent: [
        'Chúc mừng sinh nhật người con gái làm trái tim anh rung động mỗi ngày!',
        'Bước sang tuổi mới, chúc em luôn luôn vui vẻ, rạng rỡ như ánh mặt trời, công việc hanh thông và mọi điều ước hôm nay đều trở thành hiện thực.',
        'Em chỉ cần xinh đẹp và hạnh phúc thôi, cả thế giới còn lại để anh lo!',
        'Happy birthday to my lovely girl!'
      ],
      letterSignature: 'Chàng trai của em 🎂🎁💖',
      vipPhotos: [
        '/assets/photos/sample_3.jpg',
        '/assets/photos/sample_5.jpg',
        '/assets/photos/sample_1.jpg',
        '/assets/photos/sample_2.jpg',
        '/assets/photos/sample_6.jpg',
        '/assets/photos/sample_4.jpg'
      ],
      musicType: 'Sample',
      musicPath: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/iloveyou.mp3',
      customMusic: null,
      isSavePermanent: true,
      createdAt: '2026-10-15T09:00:00.000Z'
    }
  },
  {
    id: 'love_anniversary_candy',
    templateType: 'love_anniversary',
    title: 'Kỷ Niệm Ngày Yêu (Đếm Ngày Tình Yêu)',
    badge: 'Đếm Ngày Yêu Nhau',
    tagline: 'Đồng hồ đếm ngày yêu nhau chính xác từng giây, hoa Mix Candy & nhạc lãng mạn',
    icon: '💖',
    anniversaryDays: 520,
    previewGradient: 'from-pink-500 via-purple-500 to-indigo-600',
    data: {
      id: 'anniversary_520_days',
      introText: 'Happy Anniversary - 520 Ngày Đong Đầy Yêu Thương 💖',
      flowerColor: 'mix',
      letterTitle: 'Kỷ niệm chặng đường chúng mình bên nhau,',
      letterContent: [
        'Đã 520 ngày kể từ khoảnh khắc hai ta chính thức gọi nhau là người yêu.',
        'Trải qua bao nhiêu ngày nắng ngày mưa, nụ cười của em vẫn là điều quý giá nhất mà anh muốn giữ gìn trọn đời.',
        'Cảm ơn em đã kiên nhẫn, đã yêu thương và cùng anh vun đắp tình yêu này mỗi ngày.',
        'Yêu em hôm qua, hôm nay và mãi mãi về sau!'
      ],
      letterSignature: 'Mãi bên nhau em nhé 💍💞',
      vipPhotos: [
        '/assets/photos/sample_4.jpg',
        '/assets/photos/sample_2.jpg',
        '/assets/photos/sample_5.jpg',
        '/assets/photos/sample_1.jpg',
        '/assets/photos/sample_3.jpg',
        '/assets/photos/sample_6.jpg'
      ],
      musicType: 'Sample',
      musicPath: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/athousandyears.mp3',
      customMusic: null,
      isSavePermanent: true,
      createdAt: '2026-10-16T12:00:00.000Z'
    }
  },
  {
    id: 'sky_lanterns_wishes',
    templateType: 'sky_lanterns',
    title: 'Bầu Trời Đèn Lồng Điều Ước (Sky Lanterns)',
    badge: 'Huyền Ảo Lung Linh',
    tagline: 'Thả những chiếc đèn lồng phát sáng mang theo lời nguyện ước bay lên trời sao',
    icon: '🏮',
    previewGradient: 'from-amber-600 via-orange-500 to-indigo-950',
    data: {
      id: 'sky_lanterns_night_2026',
      introText: 'Vạn Điều Ước Gửi Lên Trời Sao Lấp Lánh ✨',
      flowerColor: 'coral_champagne',
      letterTitle: 'Gửi những nguyện ước tốt đẹp nhất đến em,',
      letterContent: [
        'Mỗi chiếc đèn lồng bay lên trời đêm hôm nay là một lời chúc bình an và hạnh phúc mà anh gửi gắm đến em.',
        'Dù cuộc sống ngoài kia có xô bồ thế nào, mong em luôn giữ được tâm hồn thanh thản và nụ cười rạng rỡ.',
        'Anh luôn ở đây, sẵn sàng lắng nghe và che chở cho em trong mọi hoàn cảnh.',
        'Chúc cho tất cả những ước nguyện trong tim em đều thành hiện thực!'
      ],
      letterSignature: 'Người luôn dõi theo em 🏮💫',
      vipPhotos: [
        '/assets/photos/sample_5.jpg',
        '/assets/photos/sample_6.jpg',
        '/assets/photos/sample_1.jpg',
        '/assets/photos/sample_2.jpg',
        '/assets/photos/sample_3.jpg',
        '/assets/photos/sample_4.jpg'
      ],
      musicType: 'Sample',
      musicPath: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/givemeyourforever.mp3',
      customMusic: null,
      isSavePermanent: true,
      createdAt: '2026-10-17T14:30:00.000Z'
    }
  },
  {
    id: 'golden_sunflower',
    templateType: 'sunflower',
    title: 'Bó Hoa Hướng Dương Mặt Trời (Golden Sunflower)',
    badge: 'Ấm Áp & Tươi Sáng',
    tagline: 'Sắc vàng hướng dương rực rỡ, luôn hướng về phía mặt trời và tình yêu chung thủy',
    icon: '🌻',
    previewGradient: 'from-amber-500 via-yellow-400 to-orange-500',
    data: {
      id: 'sunflower_energy_2026',
      introText: 'Em Là Ánh Nắng Rực Rỡ Của Riêng Anh 🌻☀️',
      flowerColor: 'peach',
      letterTitle: 'Gửi mặt trời nhỏ đáng yêu của anh,',
      letterContent: [
        'Như hoa hướng dương luôn hướng về ánh mặt trời, trái tim anh từ ngày gặp em cũng chỉ hướng về một người duy nhất.',
        'Năng lượng tích cực và sự ấm áp của em luôn thắp sáng những ngày u ám nhất của anh.',
        'Cảm ơn em vì đã luôn lạc quan, đáng yêu và dịu dàng với anh như thế.',
        'Mãi là mặt trời nhỏ của anh nhé!'
      ],
      letterSignature: 'Hướng về em mãi mãi 🌻💛',
      vipPhotos: [
        '/assets/photos/sample_1.jpg',
        '/assets/photos/sample_3.jpg',
        '/assets/photos/sample_5.jpg',
        '/assets/photos/sample_2.jpg',
        '/assets/photos/sample_4.jpg',
        '/assets/photos/sample_6.jpg'
      ],
      musicType: 'Sample',
      musicPath: 'https://pub-b20e97fa235346679eb882246abe5bed.r2.dev/musics/anhnangcuaanh.mp3',
      customMusic: null,
      isSavePermanent: true,
      createdAt: '2026-10-18T10:00:00.000Z'
    }
  }
];
