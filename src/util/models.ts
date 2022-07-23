export interface ProblemDto {
  name: string;
  slug: string;
  description: string;
  text: string;
  tags: string[];
  setter: string;
  metadata?: any;
}
