module.exports = {
	types: [
		{ value: '✨ Feat', name: '✨ Feat:\t새로운 기능 추가' },
		{ value: '🐛 Fix', name: '🐛 Fix:\t버그 수정' },
		{
			value: '💄 Format',
			name: '💄 Format:\t코드 포맷 수정(ex. 세미콜론 추가 등)',
		},
		{ value: '🤖 Refactor', name: '🤖 Refactor:\t코드 리팩토링(ex. UI / UX 코드 등 수정. 기능 추가, 버그 수정 x)' },
		{
			value: '✅ Test',
			name: '✅ Test:\t테스트 코드 추가 / 수정',
		},
		{
			value: '🚚 Chore',
			name: '🚚 Chore:\t빌드 / 라이브러리 등 환경설정 변경',
		},
		{ value: '📝 Docs', name: '📝 Docs:\t도큐먼트 추가 / 수정' },
	],
	skipEmptyScopes: true,
	skipQuestions: ['body', 'footer'],
	subjectLimit: 100,
};
