import { AuthorDTO, EventAttendanceDTO } from './PostListItemDTO';

export class CreatedPostDTO {
  constructor(
    public readonly uniqueKey: string,
    public readonly id: number,
    public readonly content: string,
    public readonly categoria_idcategoria: number,
    public readonly user: AuthorDTO,
    public readonly metadata: any,
    public readonly images: string[],
    public readonly createdAt: string,
    public readonly liked: boolean = false,
    public readonly eventAttendance?: EventAttendanceDTO[],
    public readonly attending?: boolean
  ) {}

  static fromDomain(
    post: any,
    author: AuthorDTO,
    images: string[]
  ): CreatedPostDTO {
    const metadata =
      typeof post.metadata === 'string'
        ? JSON.parse(post.metadata)
        : post.metadata;
        
    // Verifica se é anônimo
    const isAnonymous = post.metadata?.isAnonymous === true;

    // Aplica anonimização se necessário
    const authorToUse = isAnonymous
      ? {
          id: 0,
          name: 'Usuário Anônimo',
          avatarUrl: '/default-avatar.png',
        }
      : author;

    const eventAttendance = post.eventAttendance || [];
    const attending = eventAttendance.some(
      (a: EventAttendanceDTO) => a.userId === authorToUse.id
    );

    return new CreatedPostDTO(
      post.getUniqueIdentifier(),
      post.id!,
      post.content,
      post.categoria_idcategoria,
      authorToUse, // ← Usa o autor anonimizado se necessário
      post.metadata,
      images,
      post.createdAt.toISOString(),
      post.liked || false,
      eventAttendance,
      attending
    );
  }
}
