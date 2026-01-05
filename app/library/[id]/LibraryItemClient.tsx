"use client";

import { LibraryMaterial } from "../../types/library";

interface Props {
  material: LibraryMaterial;
}

export default function LibraryItemClient({ material }: Props) {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-3xl font-bold text-gold">
        {material.title}
      </h1>

      <p className="mt-2 opacity-70">
        {material.subject} • {material.level}
      </p>

      <div className="mt-8 border border-gold rounded-xl p-6">
        <a
          href={material.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline"
        >
          Open Material
        </a>

        {material.quizUrl && (
          <div className="mt-4">
            <a
              href={material.quizUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline"
            >
              Take Quiz
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
